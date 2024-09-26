'use client';

import { Loader2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { getSearchMovies } from '@/actions/movie';
import MovieCard from '@/components/movie-card';
import { Input } from '@/components/ui/input';
import { useIntersection } from '@/hooks/use-intersection';
import { type Movie } from '@/types/movie';

export default function SearchMovies() {
	const { ref, isIntersecting } = useIntersection();

	const [query, setQuery] = useState('');
	const [movies, setMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);

	const loadMore = useCallback(async () => {
		setIsLoading(true);

		const data = await getSearchMovies(query, page);

		setMovies((prevMovies) => {
			const movieIdSet = new Set(prevMovies.map((movie) => movie.id));
			const filteredNewMovies = data.filter(
				(movie: Movie) => !movieIdSet.has(movie.id),
			);

			return [...prevMovies, ...filteredNewMovies];
		});
		setPage((prevPage) => prevPage + 1);
	}, [query, page]);

	useEffect(() => {
		if (isIntersecting && query) {
			loadMore();
		}
	}, [isIntersecting, loadMore, query]);

	return (
		<>
			<Input
				className='mb-4'
				placeholder='Search movies'
				onChange={(e) => setQuery(e.target.value)}
			/>

			{movies.length > 0 && (
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
			)}

			{!isLoading && query && movies.length === 0 && (
				<p className='text-center'>Search not found</p>
			)}

			<div
				ref={ref}
				className='flex w-full justify-center'
			>
				{isLoading && <Loader2 className='size-8 animate-spin' />}
			</div>

		</>
	);
}
