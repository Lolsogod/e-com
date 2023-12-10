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
        deviceInfo: true,
        ratings: true,
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
      return await prisma.rating.update({
        where: {
          userId_deviceId: {
            userId: ctx.user.id,
            deviceId: input.id,
          }
        },
        data: {
          rate: input.rating
        }
      }).catch(async() => {
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
      })
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
    .query(async ({ ctx,input }) => {
      return await prisma.rating.findUnique({
        where: {
          userId_deviceId: {
            userId: ctx.user.id,
            deviceId: input.id,
          }
        },
      });
    }),
});
