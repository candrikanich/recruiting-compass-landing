import { addToWaitlist } from "~/server/utils/waitlist";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  return addToWaitlist(body?.email, {
    resendApiKey: config.resendApiKey,
    resendAudienceId: config.resendAudienceId,
  });
});
