import { router, procedure, protectedProcedure, adminProcedure } from "../trpc";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { logger } from "../logger";

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
        password: z.string().min(6),
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
      const user = await prisma.user
        .create({
          data: { email, password: hashedPassword, role: input.role },
        })
        .then((user) => {
          logger.info(`user ${user.email} created`);
          return user;
        })
        .catch((error) => {
          logger.error(error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
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
      if (!user) {
        logger.error(`user with email ${email} not found`);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        logger.error(`incorrect password for user ${email}`);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Incorrect password",
        });
      }
      const token = getJwt(user);
      logger.info(`user ${user.email} logged in`);
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
      await prisma.purchaseDevice
        .createMany({
          data: purchaseDeviceRecords,
        })
        .then(() => {
          logger.info(
            `purchase ${newPurchase.id} created by user ${ctx.user.id} succesfully`
          );
        })
        .catch((error) => {
          logger.error(error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        });
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
              device: { include: { brand: true } },
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
            device: { include: { brand: true } },
          },
        },
      },
    });
  }),
  //админ штуки
  getAll: adminProcedure.query(async () => {
    return await prisma.user.findMany({
      orderBy: { id: "asc" },
    });
  }),
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await prisma.user
        .delete({
          where: { id: input.id },
        })
        .then((user) => {
          logger.info(`user ${user.email} deleted`);
          return user;
        })
        .catch((error) => {
          logger.error(error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        });
    }),
  changeRole: adminProcedure
    .input(z.object({ id: z.number(), role: z.enum(["ADMIN", "USER"]) }))
    .mutation(async ({ input }) => {
      return await prisma.user
        .update({
          where: { id: input.id },
          data: { role: input.role },
        })
        .then((user) => {
          logger.info(`user ${user.email} role changed to ${user.role}`);
          return user;
        })
        .catch((error) => {
          logger.error(error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        });
    }),
});
