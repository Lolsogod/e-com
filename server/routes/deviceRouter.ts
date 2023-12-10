import { router, procedure, protectedProcedure } from "../trpc";
import prisma from "../prisma/client";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
//TODO: img as file? filters pagination, optionals
export const deviceRouter = router({
  get: procedure.query(async () => {
    return await prisma.device.findMany({
      include: {
        brand: true,
      },
    });
  }),
  getOne: procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await prisma.device.findUnique({
        where: {
          id: input.id,
        },
        include: {
          brand: true,
        },
      });
    }),
  create: procedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        img: z.string(),
        typeId: z.number(),
        brandId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.device.create({
        data: input,
      });
    }),
  addToCart: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const basket = await prisma.basket.findUnique({
        where: {
          userId: ctx.user.id,
        },
      });
      if (basket) {
        return await prisma.basketDevice.create({
          data: {
            basketId: basket.id,
            deviceId: input.id,
          },
        });
      }else throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Basket not found",
      });
    }),
});
