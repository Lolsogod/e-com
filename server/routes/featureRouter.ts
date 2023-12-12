import { router, procedure } from "../trpc";
import featureFlags from "../featureFlags.json";

export const featureRouter = router({
  get: procedure.mutation(async () => {
    return featureFlags;
  }),
});
