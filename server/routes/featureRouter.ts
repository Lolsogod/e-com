import { router, procedure, adminProcedure } from "../trpc";
import featureFlags from "../ff/featureFlags.json";

export const featureRouter = router({
  get: procedure.mutation(async () => {
    return featureFlags;
  }),
});
