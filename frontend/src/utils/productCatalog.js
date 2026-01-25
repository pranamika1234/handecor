import fallbackProducts from "../data/fallbackProducts.json";

export const CACHE_KEY = "handecor.products.cache";
export const CACHE_TTL = 1000 * 60 * 10; // 10 minutes

export const SOURCE_LABELS = {
  live: "Live inventory",
  cache: "Quick cache",
  fallback: "Offline catalog",
};

const BASE_PATH =
  typeof import.meta !== "undefined" && import.meta.env?.BASE_URL
    ? import.meta.env.BASE_URL
    : "/";

export function resolveAssetPath(path = "") {
  if (!path) return "";
  if (/^(?:https?:)?\/\//i.test(path) || path.startsWith("data:")) {
    return path;
  }
  const trimmed = path.startsWith("/") ? path.slice(1) : path;
  return `${BASE_PATH}${trimmed}`;
}

export const PLACEHOLDER_IMAGE = resolveAssetPath("placeholder.jpg");

export function normalizeProductMedia(products = []) {
  if (!Array.isArray(products)) return [];
  return products.map((product = {}) => {
    const imageSource =
      product.image ??
      (Array.isArray(product.images) && product.images.length
        ? product.images[0]
        : undefined) ??
      product.thumbnail ??
      product.photo ??
      product.img ??
      "";
    const resolvedImage = resolveAssetPath(imageSource) || PLACEHOLDER_IMAGE;
    return {
      ...product,
      image: resolvedImage,
    };
  });
}

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
  return normalizeProductMedia(
    Array.isArray(fallbackProducts) ? [...fallbackProducts] : [],
  );
}
