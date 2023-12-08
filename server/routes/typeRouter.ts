import { router, procedure } from "../trpc";
import prisma from "../prisma/client";
import { z } from "zod";

export const typeRouter = router({
  get: procedure.query(async () => {
    return await prisma.type.findMany();
  }),
  create: procedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.type.create({
        data: input,
      });
    }),
});