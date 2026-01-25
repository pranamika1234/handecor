import React, { useEffect, useRef, useState } from 'react'
import { PLACEHOLDER_IMAGE, resolveAssetPath } from '../utils/productCatalog'

export default function LazyImage({
	src,
	alt,
	className,
	placeholder = PLACEHOLDER_IMAGE,
	...rest
}) {
	const imgRef = useRef(null)
	const normalizedPlaceholder = resolveAssetPath(placeholder) || PLACEHOLDER_IMAGE
	const normalizedSrc = src ? resolveAssetPath(src) : normalizedPlaceholder
	const [currentSrc, setCurrentSrc] = useState(normalizedPlaceholder)

	useEffect(() => {
		const node = imgRef.current
		if (!node) return

		const revealImage = () => setCurrentSrc(normalizedSrc)

		const observerSupported = typeof IntersectionObserver !== 'undefined'
		if (!observerSupported) {
			revealImage()
			return
		}

		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						revealImage()
						obs.disconnect()
					}
				})
			},
			{ rootMargin: '200px' }
		)

		observer.observe(node)
		return () => observer.disconnect()
	}, [normalizedSrc])

	return (
		<img
			ref={imgRef}
			src={currentSrc}
			alt={alt}
			className={className}
			loading="lazy"
			decoding="async"
			{...rest}
		/>
	)
}
