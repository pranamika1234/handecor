import React, { useEffect, useRef, useState } from "react";
import { List } from "react-window";
import { fetchProducts } from "../api";
import ProductCard from "../components/Productcard";
import SourceBadge from "../components/SourceBadge";
import {
  SOURCE_LABELS,
  getFallbackProducts,
  normalizeProductMedia,
  readCachedProducts,
  writeCachedProducts,
} from "../utils/productCatalog";

const fallbackCatalog = getFallbackProducts();

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dataSource, setDataSource] = useState("loading");
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const hydrateFromLocal = () => {
      const cachedPayload = readCachedProducts();
      if (cachedPayload) {
        setProducts(normalizeProductMedia(cachedPayload.data));
        setDataSource("cache");
        setLastUpdated(cachedPayload.timestamp);
      } else if (fallbackCatalog.length) {
        setProducts(fallbackCatalog);
        setDataSource("fallback");
        setLastUpdated(null);
      }
      setLoading(false);
    };

    const hydrateFromRemote = async () => {
      setRefreshing(true);
      try {
        const response = await fetchProducts({
          signal: controller.signal,
          timeout: 10000,
        });
        if (cancelled) return;
        const remoteProducts = Array.isArray(response?.data)
          ? response.data
          : [];
        if (remoteProducts.length) {
          const timestamp = Date.now();
          const normalizedProducts = normalizeProductMedia(remoteProducts);
          setProducts(normalizedProducts);
          setDataSource("live");
          setLastUpdated(timestamp);
          writeCachedProducts(normalizedProducts, timestamp);
          setErrorMessage("");
        }
      } catch (error) {
        if (cancelled || error?.code === "ERR_CANCELED") return;
        console.error("Unable to fetch live products", error);
        setErrorMessage(
          "Live inventory is temporarily unavailable. Showing cached catalog.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    };

    hydrateFromLocal();
    hydrateFromRemote();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const formattedTimestamp = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div>
      <section className="mb-8">
        <h1 className="h1-handmade text-4xl font-bold mb-3">
          Shop All Products
        </h1>
        <p className="text-gray-600">
          Discover our complete collection of handmade treasures
        </p>
      </section>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white border rounded-lg p-6 sticky top-4">
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-2 rounded transition ${
                    selectedCategory === cat
                      ? "bg-brand text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t space-y-2">
              <p className="text-sm text-gray-600">
                Showing {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {dataSource !== "loading" && (
                  <SourceBadge
                    status={dataSource}
                    label={SOURCE_LABELS[dataSource] ?? "Loading catalog"}
                  />
                )}
                {formattedTimestamp && (
                  <span className="text-gray-400">
                    Updated {formattedTimestamp}
                  </span>
                )}
                {refreshing && (
                  <span className="text-brand">Refreshing inventory</span>
                )}
              </div>
              {errorMessage && (
                <p className="text-xs text-red-600">{errorMessage}</p>
              )}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          {loading ? (
            <SkeletonGrid count={8} />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No products found in this category
            </div>
          ) : (
            <VirtualizedProductGrid products={filteredProducts} />
          )}
        </main>
      </div>
    </div>
  );
}

function VirtualizedProductGrid({ products }) {
  const containerRef = useRef(null);
  const [columns, setColumns] = useState(1);
  const [width, setWidth] = useState(400);

  useEffect(() => {
    function handleResize() {
      const node = containerRef.current;
      const measuredWidth = node?.offsetWidth || window.innerWidth || 400;
      setWidth(measuredWidth);
      if (measuredWidth >= 1280) setColumns(4);
      else if (measuredWidth >= 1024) setColumns(3);
      else if (measuredWidth >= 640) setColumns(2);
      else setColumns(1);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rowCount = Math.ceil(products.length / columns);
  const CARD_HEIGHT = 370;
  const ROW_GAP = 24;
  const listHeight = Math.min(
    Math.max(rowCount, 1) * (CARD_HEIGHT + ROW_GAP),
    1200,
  );

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      <List
        height={listHeight}
        itemCount={Math.max(rowCount, 1)}
        itemSize={CARD_HEIGHT + ROW_GAP}
        width={width}
        itemData={{ products, columns, gap: ROW_GAP }}
      >
        {VirtualizedRow}
      </List>
    </div>
  );
}

function VirtualizedRow({ index, style, data }) {
  const { products, columns, gap } = data;
  const children = [];

  for (let column = 0; column < columns; column += 1) {
    const productIndex = index * columns + column;
    if (productIndex >= products.length) break;
    children.push(
      <div
        key={products[productIndex]?._id ?? productIndex}
        style={{ flex: 1, minWidth: 0 }}
      >
        <ProductCard product={products[productIndex]} />
      </div>,
    );
  }

  return (
    <div style={{ ...style, display: "flex", gap, padding: "0 12px" }}>
      {children}
    </div>
  );
}

function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="border rounded-lg overflow-hidden bg-white shadow-sm animate-pulse"
        >
          <div className="h-56 w-full bg-gray-200" />
          <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="flex gap-3 pt-2">
              <div className="h-8 flex-1 bg-gray-200 rounded" />
              <div className="h-8 flex-1 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
