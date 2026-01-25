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
const NORMALIZED_BASE =
  BASE_PATH === "/"
    ? "/"
    : BASE_PATH.endsWith("/")
      ? BASE_PATH
      : `${BASE_PATH}/`;
const BASE_SEGMENT =
  NORMALIZED_BASE === "/"
    ? ""
    : NORMALIZED_BASE.replace(/^\/+|\/+$/g, "");

export function resolveAssetPath(path = "") {
  if (!path) return "";
  if (/^(?:https?:)?\/\//i.test(path) || path.startsWith("data:")) {
    return path;
  }
  if (NORMALIZED_BASE === "/") {
    const trimmed = path.startsWith("/") ? path : `/${path}`;
    return trimmed.replace(/\/+/g, "/");
  }

  let working = path.replace(/^\/+/, "");

  const normalizedSegment = BASE_SEGMENT ? `${BASE_SEGMENT}/` : "";
  if (normalizedSegment) {
    while (working.startsWith(normalizedSegment)) {
      working = working.slice(normalizedSegment.length);
    }
    if (working === BASE_SEGMENT) {
      working = "";
    }
  }

  return `${NORMALIZED_BASE}${working}`;
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
