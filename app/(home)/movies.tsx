'use client';

import { Loader2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { getMovies } from '@/actions/movie';
import MovieCard from '@/components/movie-card';
import { type Movie } from '@/types/movie';

interface MoviesProps {
	initialMovies: Movie[];
}

export default function Movies({ initialMovies }: MoviesProps) {
	const { ref, inView } = useInView();

	const [movies, setMovies] = useState(initialMovies);
	const [page, setPage] = useState(2);

	const loadMore = useCallback(async () => {
		const results = await getMovies(page);

		setMovies((prevMovies) => [...prevMovies, ...results]);
		setPage((prevPage) => prevPage + 1);
	}, [page]);

	useEffect(() => {
		if (inView) {
			loadMore();
		}
	}, [inView, loadMore]);

	return (
		<>
			<div className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
				{movies.map((item) => {
					return (
						<MovieCard
							key={item.id}
							movie={item}
						/>
					);
				})}
			</div>

			<div className='flex w-full justify-center'>
				<Loader2
					ref={ref}
					className='size-8 animate-spin'
				/>
			</div>
		</>
	);
}
