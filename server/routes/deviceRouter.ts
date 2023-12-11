import { router, procedure, protectedProcedure } from "../trpc";
import prisma from "../prisma/client";
import { z } from "zod";

//TODO: img as file? filters pagination, optionals
export const deviceRouter = router({
  get: procedure.query(async () => {
    return await prisma.device.findMany({
      include: {
        brand: true,
        deviceInfo: true,
        ratings: true,
      },
      orderBy: {
        id: "asc",
      }
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
          ratings: true,
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
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.device.create({
        data: input,
      });
    }),
  rate: protectedProcedure
    .input(z.object({ id: z.number(), rating: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await prisma.rating
        .update({
          where: {
            userId_deviceId: {
              userId: ctx.user.id,
              deviceId: input.id,
            },
          },
          data: {
            rate: input.rating,
          },
        })
        .catch(async () => {
          await prisma.purchaseDevice.findFirstOrThrow({
            where: {
              deviceId: input.id,
              purchase: {
                userId: ctx.user.id,
              },
            },
          });
          return await prisma.rating.create({
            data: {
              userId: ctx.user.id,
              deviceId: input.id,
              rate: input.rating,
            },
          });
        });
    }),
  rateable: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await prisma.purchaseDevice.findFirst({
        where: {
          deviceId: input.id,
          purchase: {
            userId: ctx.user.id,
          },
        },
      });
    }),
  userRating: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await prisma.rating.findUnique({
        where: {
          userId_deviceId: {
            userId: ctx.user.id,
            deviceId: input.id,
          },
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await prisma.device.delete({
        where: {
          id: input.id,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        img: z.string(),
        typeId: z.number(),
        brandId: z.number(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.device.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),
});
