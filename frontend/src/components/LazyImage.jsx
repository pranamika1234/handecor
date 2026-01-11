import React, { useEffect, useRef, useState } from 'react'

export default function LazyImage({
	src,
	alt,
	className,
	placeholder = '/placeholder.jpg',
	...rest
}) {
	const imgRef = useRef(null)
	const [currentSrc, setCurrentSrc] = useState(placeholder)

	useEffect(() => {
		const node = imgRef.current
		if (!node) return

		const revealImage = () => setCurrentSrc(src || placeholder)

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
	}, [src, placeholder])

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
