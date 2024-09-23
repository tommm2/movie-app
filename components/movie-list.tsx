'use client';

import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { getMovies } from '@/actions/movie';
import MovieCard from '@/components/movie-card';
import { Movie } from '@/types/movie';

const INITIAL_PAGE = 2;

interface MovieListProps {
	initialMovies: Movie[];
}

export default function MovieList({ initialMovies }: MovieListProps) {
	const [page, setPage] = useState(INITIAL_PAGE);
	const [movies, setMovies] = useState(initialMovies);

	const { ref, inView } = useInView();

	const loadMoreMovies = useCallback(async () => {
		const results = await getMovies(page);

		setMovies((prevMovies) => [...prevMovies, ...results]);
		setPage((prevPage) => prevPage + 1);
	}, [page]);

	useEffect(() => {
		if (inView) {
			loadMoreMovies();
		}
	}, [inView, loadMoreMovies]);

	return (
		<div className='grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
			{movies.map((item: Movie) => {
				return (
					<MovieCard
						key={item.id}
						id={item.id}
						title={item.title}
						posterPath={item.poster_path}
					/>
				);
			})}
			<div ref={ref}>Loading...</div>
		</div>
	);
}
