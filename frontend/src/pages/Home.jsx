import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

export default function Home() {
	const [products, setProducts] = useState(fallbackCatalog);
	const [loading, setLoading] = useState(true);
	const [dataSource, setDataSource] = useState("loading");
	const [lastUpdated, setLastUpdated] = useState(null);
	const [refreshing, setRefreshing] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		let cancelled = false;
		const controller = new AbortController();

		const hydrateFromLocal = () => {
			const cachedPayload = readCachedProducts();
			if (cachedPayload) {
				setProducts(normalizeProductMedia(cachedPayload.data));
				setDataSource("cache");
				setLastUpdated(cachedPayload.timestamp);
				setLoading(false);
				return true;
			}
			if (fallbackCatalog.length) {
				setProducts(fallbackCatalog);
				setDataSource("fallback");
				setLoading(false);
				return true;
			}
			return false;
		};

		const hadLocalData = hydrateFromLocal();

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
					const normalizedProducts =
						normalizeProductMedia(remoteProducts);
					setProducts(normalizedProducts);
					setDataSource("live");
					setLastUpdated(timestamp);
					writeCachedProducts(normalizedProducts, timestamp);
					setErrorMessage("");
				}
			} catch (error) {
				if (cancelled || error?.code === "ERR_CANCELED") return;
				console.error("Unable to fetch featured catalog", error);
				if (!hadLocalData) {
					setErrorMessage(
						"We couldn't reach the live catalog yet. Showing placeholders.",
					);
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
					setRefreshing(false);
				}
			}
		};

		hydrateFromRemote();

		return () => {
			cancelled = true;
			controller.abort();
		};
	}, []);

	const featuredProducts = products.filter((p) => p.featured);
	const regularProducts = products.filter((p) => !p.featured);
	const limitedProducts = regularProducts.slice(0, 6);
	const formattedTimestamp = lastUpdated
		? new Date(lastUpdated).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			})
		: null;

	return (
		<div>
			{/* Hero Section */}
			<section
				className="relative -mx-4 -mt-8 mb-12 h-[500px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
				style={{
					backgroundImage: `url('${import.meta.env.BASE_URL}authentic-handmade-products.jpg')`,
				}}
			>
				<div className="absolute inset-0 bg-black/40"></div>
				<div className="relative z-10 text-center text-white px-4 max-w-4xl">
					<h1 className="h1-handmade text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
						Handmade Goods, Made With Care
					</h1>
					<p className="text-xl md:text-2xl mb-8 drop-shadow-md">
						Discover unique, small-batch items crafted by talented artisans
					</p>
					<Link
						to="/shop"
						className="inline-block px-10 py-4 bg-brand text-white rounded-lg font-semibold text-lg hover:bg-brand/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
					>
						Shop Now
					</Link>
				</div>
			</section>

			{loading ? (
				<HomeSkeleton />
			) : (
				<>
					<div className="mb-10 flex flex-wrap items-center gap-4 text-sm text-gray-600">
						{dataSource !== "loading" && (
							<SourceBadge
								status={dataSource}
								label={SOURCE_LABELS[dataSource] ?? "Loading catalog"}
							/>
						)}
						{formattedTimestamp && (
							<span className="text-gray-400">Updated {formattedTimestamp}</span>
						)}
						{refreshing && (
							<span className="text-brand">Refreshing inventory...</span>
						)}
					</div>
					{errorMessage && (
						<p className="mb-6 text-sm text-red-600">{errorMessage}</p>
					)}

					{featuredProducts.length > 0 && (
						<section className="mb-12">
							<h2 className="text-2xl font-bold mb-6 h1-handmade">
								Featured Products
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
								{featuredProducts.map((p) => (
									<ProductCard key={p._id} product={p} />
								))}
							</div>
						</section>
					)}

					<section>
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-2xl font-bold h1-handmade">All Products</h2>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
							{limitedProducts.map((p) => (
								<ProductCard key={p._id} product={p} />
							))}
						</div>
						{regularProducts.length > 6 && (
							<div className="text-center">
								<Link
									to="/shop"
									className="inline-block px-8 py-3 bg-brand text-white rounded-lg font-semibold hover:bg-brand/90 transition-all shadow-md hover:shadow-lg"
								>
									See More Products ({regularProducts.length - 6}+ More)
								</Link>
							</div>
						)}
					</section>
				</>
			)}
		</div>
	);
}

function HomeSkeleton() {
	return (
		<div className="space-y-12">
			<div>
				<div className="h-6 w-48 bg-gray-200 rounded mb-6 animate-pulse" />
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{Array.from({ length: 3 }).map((_, idx) => (
						<div
							key={idx}
							className="border rounded-lg overflow-hidden bg-white shadow-sm animate-pulse"
						>
							<div className="h-56 w-full bg-gray-200" />
							<div className="p-4 space-y-3">
								<div className="h-5 bg-gray-200 rounded" />
								<div className="h-4 bg-gray-200 rounded w-3/4" />
								<div className="h-4 bg-gray-200 rounded w-1/2" />
							</div>
						</div>
					))}
				</div>
			</div>

			<div>
				<div className="h-6 w-40 bg-gray-200 rounded mb-6 animate-pulse" />
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{Array.from({ length: 6 }).map((_, idx) => (
						<div
							key={idx}
							className="border rounded-lg overflow-hidden bg-white shadow-sm animate-pulse"
						>
							<div className="h-48 w-full bg-gray-200" />
							<div className="p-4 space-y-3">
								<div className="h-5 bg-gray-200 rounded" />
								<div className="h-4 bg-gray-200 rounded w-3/4" />
								<div className="h-4 bg-gray-200 rounded w-1/2" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}