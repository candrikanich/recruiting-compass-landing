// Prerendered HTML can't know the visitor's query string, and during hydration
// the router briefly drops it, so follow the route instead of sampling
// window.location once. Empty on the server and until mount.
export function useInboundQuery() {
  const route = useRoute();
  const search = ref("");
  const sync = () => {
    search.value = new URLSearchParams(
      Object.entries(route.query).flatMap(([key, value]) =>
        typeof value === "string" ? [[key, value]] : [],
      ),
    ).toString();
  };
  onMounted(() => {
    sync();
    watch(() => route.query, sync);
  });
  return search;
}
