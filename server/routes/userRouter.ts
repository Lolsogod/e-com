import { router, procedure, protectedProcedure } from "../trpc";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const getJwt = (user: User) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.SECRET || "123",
    { expiresIn: "7d" }
  );
};

export const userRouter = router({
  register: procedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        role: z.enum(["ADMIN", "USER"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const candidate = await prisma.user.findUnique({
        where: { email },
      });
      if (candidate)
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hashedPassword, role: input.role },
      });
      const token = getJwt(user);
      return token;
    }),
  login: procedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Incorrect password",
        });
      const token = getJwt(user);
      return token;
    }),
  purchase: protectedProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .mutation(async ({ ctx, input }) => {
      const { ids } = input;
      const newPurchase = await prisma.purchase.create({
        data: {
          date: new Date(),
          userId: ctx.user.id,
        },
      });
      const purchaseDeviceRecords = ids.map((deviceId) => {
        return {
          deviceId: deviceId,
          purchaseId: newPurchase.id,
        };
      });
      console.log(purchaseDeviceRecords);
      await prisma.purchaseDevice.createMany({
        data: purchaseDeviceRecords,
      });
      console.log("Payment created successfully");
      return newPurchase;
    }),
  getOnePurchase: protectedProcedure
    .input(z.object({ purchaseId: z.number() }))
    .query(async ({ ctx, input }) => {
      return await prisma.purchase.findUnique({
        where: {
          id: input.purchaseId,
          userId: ctx.user.id,
        },
        include: {
          purchaseDevices: {
            include: {
              device: {
                include: {
                  brand: true,
                },
              },
            },
          },
        },
      });
    }),
  getUserPurchases: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.purchase.findMany({
      where: {
        userId: ctx.user.id,
      },
      include: {
        purchaseDevices: {
          include: {
            device: {
              include: {
                brand: true,
              },
            },
          },
        },
      },
    });
  }),
  //админ штуки
  getAll: procedure.query(async () => {
    return await prisma.user.findMany({
      orderBy: {
        id: "asc",
      }
    });
  }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await prisma.user.delete({
        where: {
          id: input.id,
        },
      });
    }),
  changeRole: protectedProcedure
    .input(z.object({ id: z.number(), role: z.enum(["ADMIN", "USER"]) }))
    .mutation(async ({ input }) => {
      return await prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          role: input.role,
        },
      });
    }),
});
