'use client';

import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

interface ImageProps extends NextImageProps {
	imageClassName?: string;
}

export default function BlurImage(props: ImageProps) {
	const { alt, src, className, imageClassName, ...rest } = props;
	const [isLoading, setIsLoading] = useState(true);

	return (
		<div className={cn('overflow-hidden rounded-sm', className)}>
			<NextImage
				className={cn(
					'transition-[filter] duration-150',
					imageClassName,
					isLoading && 'scale-[1.02] blur-xl grayscale',
				)}
				src={src}
				alt={alt}
				priority
				quality={100}
				onLoad={() => setIsLoading(false)}
				{...rest}
			/>
		</div>
	);
}
