import { router, procedure } from "../trpc";
import prisma from "../prisma/client";
import { z } from "zod";

export const brandRouter = router({
  get: procedure.query(async () => {
    return await prisma.brand.findMany({
      orderBy: {
        id: "asc",
      }
    });
  }),
  create: procedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.brand.create({
        data: input,
      });
    }),
  update: procedure
    .input(z.object({ id: z.number(), name: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.brand.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),
  delete: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await prisma.brand.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
