'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { getMovies } from '@/actions/movie';
import MovieCard from '@/components/movie-card';
import SortControl from '@/components/sort-control';
import { useIntersection } from '@/hooks/use-intersection';
import { getUniqueMovies, sortMovies } from '@/lib/utils';
import { type Movie } from '@/types/movie';
import type { OrderBy, SortBy } from '@/types/sort';

export default function Movies() {
	const { ref, isIntersecting } = useIntersection();

	const [movies, setMovies] = useState<Movie[]>([]);
	const [orderBy, setOrderBy] = useState<OrderBy>('');
	const [sortBy, setSortBy] = useState<SortBy>('desc');
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (isIntersecting) {
			setIsLoading(true);

			getMovies(page)
				.then((data) => {
					setMovies((prev) => getUniqueMovies(prev, data));
					setPage((prevPage) => prevPage + 1);
					setIsLoading(false);
				})
				.finally(() => setIsLoading(false));
		}
	}, [isIntersecting, page]);

	const sortedMovies = useMemo(() => {
		return sortMovies({ orderBy, sortBy, data: movies });
	}, [orderBy, sortBy, movies]);

	return (
		<>
			<SortControl
				orderBy={orderBy}
				sortBy={sortBy}
				onOrderBy={setOrderBy}
				onSortBy={setSortBy}
			/>

			<div className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
				{sortedMovies.map((item) => {
					return (
						<MovieCard
							key={item.id}
							movie={item}
						/>
					);
				})}
			</div>

			<div
				ref={ref}
				className='flex w-full justify-center py-4'
			>
				{isLoading && <Loader2 className='size-8 animate-spin' />}
			</div>
		</>
	);
}
