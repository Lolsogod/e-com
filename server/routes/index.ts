import { brandRouter } from "./brandRouter";
import { deviceRouter } from "./deviceRouter";
import { userRouter } from "./userRouter";
import { featureRouter } from "./featureRouter"
import { createContext } from "../trpc";
import * as trpcExpress from "@trpc/server/adapters/express";
import { router } from "../trpc";

//TODO: add controllers maybe and error handling
const appRouter = router({
  brand: brandRouter,
  device: deviceRouter,
  user: userRouter,
  feature: featureRouter
});

export const trpcToExpress = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});

export type AppRouter = typeof appRouter;