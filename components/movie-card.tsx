'use client';

import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { type Movie } from '@/types/movie';

import BlurImage from './blur-image';
import WatchlistButton from './watchlist-button';

interface MovieCardProps {
	movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);

	const handleNavigate = () => {
		router.push(`/detail/${movie.id}`);
	};

	return (
		<div
			className='group relative cursor-pointer'
			onClick={handleNavigate}
		>
			<BlurImage
				src={
					movie.poster_path
						? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
						: '/images/img-placeholder.jpg'
				}
				alt={movie.title}
				width={300}
				height={400}
				imageClassName='w-full'
			/>

			<WatchlistButton
				className='absolute right-2 top-2'
				movie={movie}
			/>

			<div className='mt-2 flex items-center justify-between'>
				<h2 className='line-clamp-1 w-full text-xl font-bold'>{movie.title}</h2>

				<div className='flex flex-row items-center gap-2'>
					<Star className='text-[#FFAD49]' />
					<p className='font-bold text-[#FFAD49]'>
						{movie.vote_average ? movie.vote_average.toFixed(1) : ''}
					</p>
				</div>
			</div>
		</div>
	);
}
