import { appStoreCampaign, appStoreUrl } from "~/data/site";
import { useInboundQuery } from "~/composables/useInboundQuery";

// App Store link whose `ct` names the placement plus the visitor's inbound
// utm_source, so /links?utm_source=instagram becomes ct=links-instagram.
export function useAppStoreUrl(placement: string) {
  const search = useInboundQuery();
  return computed(() => appStoreUrl(appStoreCampaign(placement, search.value)));
}
