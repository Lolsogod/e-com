import { User } from "@prisma/client";
import { TRPCError, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { verify } from "jsonwebtoken";
import { logger } from "../logger";

export async function createContext({
  req,
}: trpcExpress.CreateExpressContextOptions) {
  async function getUserFromHeader() {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ").length > 1
    ) {
      const user = await verify(
        req.headers.authorization.split(" ")[1],
        process.env.SECRET || "123"
      );
      return user as User;
    }
    return null;
  }
  const user = await getUserFromHeader();
  return { user };
}
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware((opts) => {
  const { ctx } = opts;
  if (!ctx.user) {
    logger.error("Not authorized user tryed to access protected route");
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: { user: ctx.user },
  });
});

const isAdmin = t.middleware((opts) => {
  const { ctx } = opts;
  if (ctx.user?.role !== "ADMIN") {
    logger.error("Not authorized user tryed to access admin route");
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: { user: ctx.user },
  });
});
export const protectedProcedure = t.procedure.use(isAuthed);
export const adminProcedure = t.procedure.use(isAdmin);
export const middleware = t.middleware;
export const router = t.router;
export const procedure = t.procedure;
