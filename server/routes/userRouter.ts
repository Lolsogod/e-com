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
      //TODO:надо ли? + разгрузить
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
      const basket = await prisma.basket.create({
        data: { userId: user.id },
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
  checkAuth: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
  getCart: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.basket.findUnique({
      where: { userId: ctx.user.id },
      include: {
        basketDevices: {
          include: {
            device: {
              include: { brand: true },
            },
          },
        },
      },
    });
  }),
});
