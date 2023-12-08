import { brandRouter } from "./brandRouter";
import { typeRouter } from "./typeRouter";
import { deviceRouter } from "./deviceRouter";
import { userRouter } from "./userRouter";

import { createContext } from "../trpc";
import * as trpcExpress from "@trpc/server/adapters/express";
import { router } from "../trpc";

//TODO: add controllers maybe and error handling
const appRouter = router({
  brand: brandRouter,
  type: typeRouter,
  device: deviceRouter,
  user: userRouter,
});

export const trpcToExpress = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});

export type AppRouter = typeof appRouter;