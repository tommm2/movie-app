import { useEffect, useRef, useState } from 'react';

export function useIntersection(options?: IntersectionObserverInit) {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIsIntersecting(entry.isIntersecting);
		}, options);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	}, [options]);

	return { ref, isIntersecting };
}
