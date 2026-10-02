import { addToWaitlist, isBotSubmission } from "~/server/utils/waitlist";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  // Report success so a bot gets no signal to adapt to.
  if (isBotSubmission(body)) return { success: true };
  return addToWaitlist(body?.email, {
    resendApiKey: config.resendApiKey,
    resendAudienceId: config.resendAudienceId,
  });
});
