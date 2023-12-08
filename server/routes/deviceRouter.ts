import { router, procedure } from "../trpc";
import prisma from "../prisma/client";
import { z } from "zod";
//TODO: img as file? filters pagination, optionals
export const deviceRouter = router({
  get: procedure.query(async () => {
    return await prisma.device.findMany();
  }),
  getOne: procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await prisma.device.findUnique({
        where: {
          id: input.id,
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
