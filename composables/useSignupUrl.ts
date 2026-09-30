import { webSignupUrl } from "~/data/site";

// Prerendered HTML can't know the visitor's query string, so the link starts
// with landing attribution. During hydration the router briefly rewrites the
// URL to the bare path before restoring the query, so read it from the route
// and follow changes rather than sampling window.location once.
export function useSignupUrl(campaign: string) {
  const route = useRoute();
  const href = ref(webSignupUrl(campaign));
  const sync = () => {
    const search = new URLSearchParams(
      Object.entries(route.query).flatMap(([key, value]) =>
        typeof value === "string" ? [[key, value]] : [],
      ),
    ).toString();
    href.value = webSignupUrl(campaign, search);
  };
  onMounted(() => {
    sync();
    watch(() => route.query, sync);
  });
  return href;
}
