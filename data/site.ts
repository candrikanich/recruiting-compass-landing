// Single switch for launch state. Flip `iosLive` to true the day Apple approves
// the app: App Store badges, the Smart App Banner and footer copy all follow it.
export const iosLive = true;

export const APP_STORE_ID = "6758562332";

// App Store Connect → App Analytics → Acquisition → Campaigns shows the `pt`
// value in any generated link. Until it's set, links still work but aren't
// attributed to a campaign.
export const APP_STORE_PROVIDER_TOKEN = "";

export const WEB_APP_URL = "https://myrecruitingcompass.com";

export const SOCIAL = {
  facebook: "https://www.facebook.com/TheRecruitingCompass",
  instagram: "https://www.instagram.com/therecruitingcompass",
  x: "https://x.com/recruitCompass",
  tiktok: "https://www.tiktok.com/@therecruitingcompass",
} as const;

// Campaign names match between App Store `ct` and web `utm_campaign` so iOS
// and web signups can be compared per placement.
export function appStoreUrl(campaign: string): string {
  const params = new URLSearchParams();
  if (APP_STORE_PROVIDER_TOKEN) params.set("pt", APP_STORE_PROVIDER_TOKEN);
  params.set("ct", campaign.slice(0, 40));
  return `https://apps.apple.com/app/id${APP_STORE_ID}?${params.toString()}`;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

// A visitor who arrived from a tagged social link keeps that source through to
// signup; the landing placement they clicked moves to utm_content.
export function webSignupUrl(campaign: string, inboundSearch = ""): string {
  const inbound = new URLSearchParams(inboundSearch);
  const params = inbound.get("utm_source")
    ? new URLSearchParams({
        ...Object.fromEntries(
          UTM_KEYS.flatMap((key) => {
            const value = inbound.get(key);
            return value ? [[key, value]] : [];
          }),
        ),
        utm_content: campaign,
      })
    : new URLSearchParams({
        utm_source: "landing",
        utm_medium: "website",
        utm_campaign: campaign,
      });
  return `${WEB_APP_URL}/signup?${params.toString()}`;
}

// App Store `ct` for a placement, split by the inbound utm_source when there is
// one (links-instagram, links-facebook) so App Store Connect shows installs per
// channel. Apple allows letters, digits and dashes; anything else is dropped.
export function appStoreCampaign(
  placement: string,
  inboundSearch = "",
): string {
  const source = (new URLSearchParams(inboundSearch).get("utm_source") ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
  return source ? `${placement}-${source}` : placement;
}

// iPadOS reports itself as a Mac, so a touch screen on "MacIntel" counts too.
export function isAppleMobile(device: {
  userAgent: string;
  platform?: string;
  maxTouchPoints?: number;
}): boolean {
  return (
    /iPhone|iPad|iPod/.test(device.userAgent) ||
    (device.platform === "MacIntel" && (device.maxTouchPoints ?? 0) > 1)
  );
}
