import fallbackProducts from "../data/fallbackProducts.json";

export const CACHE_KEY = "handecor.products.cache";
export const CACHE_TTL = 1000 * 60 * 10; // 10 minutes

export const SOURCE_LABELS = {
  live: "Live inventory",
  cache: "Quick cache",
  fallback: "Offline catalog",
};

export function readCachedProducts() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const hasData = Array.isArray(parsed?.data) && parsed.data.length > 0;
    const isFresh =
      parsed?.timestamp && Date.now() - parsed.timestamp < CACHE_TTL;
    if (hasData && isFresh) return parsed;
    window.localStorage.removeItem(CACHE_KEY);
    return null;
  } catch (error) {
    console.warn("Unable to read product cache", error);
    return null;
  }
}

export function writeCachedProducts(data, timestamp = Date.now()) {
  if (
    typeof window === "undefined" ||
    !Array.isArray(data) ||
    data.length === 0
  ) {
    return;
  }
  try {
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp })
    );
  } catch (error) {
    console.warn("Unable to persist product cache", error);
  }
}

export function getFallbackProducts() {
  return Array.isArray(fallbackProducts) ? fallbackProducts : [];
}
