'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/utils';

interface MovieCardProps {
	id: number;
	title: string;
	posterPath: string;
}

export default function MovieCard({ id, title, posterPath }: MovieCardProps) {
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	const handleClick = () => {
		router.push(`/detail/${id}`);
	};

	return (
		<div
			className='group relative cursor-pointer'
			onClick={handleClick}
		>
			{id}
			<Image
				src={`https://image.tmdb.org/t/p/original/${posterPath}`}
				alt={title}
				width={300}
				height={400}
				priority
				className={cn('w-auto rounded-sm transition-all', {
					'blur-lg': isLoading,
				})}
				onLoad={() => setIsLoading(false)}
			/>
		</div>
	);
}
