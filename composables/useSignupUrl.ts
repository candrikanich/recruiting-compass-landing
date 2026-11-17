import { webSignupUrl } from "~/data/site";
import { useInboundQuery } from "~/composables/useInboundQuery";

// Starts with landing attribution in the prerendered HTML, then picks up the
// visitor's inbound UTM tags once mounted (see useInboundQuery).
export function useSignupUrl(campaign: string) {
  const search = useInboundQuery();
  return computed(() => webSignupUrl(campaign, search.value));
}
