import { router, procedure } from "../trpc";
import prisma from "../prisma/client";
import { z } from "zod";
//unused
export const brandRouter = router({
  get: procedure.query(async () => {
    return await prisma.brand.findMany();
  }),
  create: procedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.brand.create({
        data: input,
      });
    }),
});
