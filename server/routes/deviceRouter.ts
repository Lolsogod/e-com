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
          deviceInfo: true,
          ratings: true
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
});
