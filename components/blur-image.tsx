'use client';

import NextImage, { type ImageProps as NextImageProps } from 'next/image';

import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ImageProps extends NextImageProps {
}

export default function BlurImage(props: ImageProps) {
	const { alt, src, className, ...rest } = props;
	const [isLoading, setIsLoading] = useState(true);

	return (
		<NextImage
			className={cn(
				'transition-[filter] duration-150',
				isLoading && 'scale-[1.02] blur-xl grayscale',
				className,
			)}
			src={src}
			alt={alt}
			priority
			quality={100}
			onLoad={() => setIsLoading(false)}
			{...rest}
		/>
	);
}
