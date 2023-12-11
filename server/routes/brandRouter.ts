import { router, procedure } from "../trpc";
import prisma from "../prisma/client";
import { z } from "zod";
import { logger } from "../logger";

export const brandRouter = router({
  get: procedure.query(async () => {
    return await prisma.brand.findMany({
      orderBy: { id: "asc" },
    });
  }),
  create: procedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.brand.create({ data: input }).then(() => {
        logger.info(`brand ${input.name} was created`);
      });
    }),
  update: procedure
    .input(z.object({ id: z.number(), name: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.brand.update({
        where: { id: input.id },
        data: { name: input.name },
      }).then(() => {
        logger.info(`brand ${input.name} was updated`);
      });
    }),
  delete: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await prisma.brand.delete({
        where: { id: input.id },
      }).then(() => {
        logger.info(`brand ${input.id} was deleted`);
      });
    }),
});
