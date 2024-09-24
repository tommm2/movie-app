'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { getSearchMovies } from '@/actions/movie';
import MovieCard from '@/components/movie-card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { type Movie } from '@/types/movie';

export default function SearchMovies() {
	const { ref, inView } = useInView();

	const [query, setQuery] = useState('');
	const [movies, setMovies] = useState<Movie[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const loadMovies = async (reset: boolean = false) => {
		if (isLoading || query === '') return;

		setIsLoading(true);

		const currentPage = reset ? 1 : page;
		const results = await getSearchMovies(query, currentPage);

		setMovies((prevMovies) => (reset ? results : [...prevMovies, ...results]));
		setPage((prevPage) => (reset ? 2 : prevPage + 1));
		setIsLoading(false);
	};

	useEffect(() => {
		if (query) {
			loadMovies(true);
		}
	}, [query]);

	useEffect(() => {
		if (inView && !isLoading) {
			loadMovies();
		}
	}, [inView]);

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

			{query && movies.length === 0 && (
				<p className='text-center'>Search not found</p>
			)}

			<div className='flex w-full justify-center'>
				<Loader2
					ref={ref}
					className={cn(
						'size-8 animate-spin',
						isLoading ? 'opacity-100' : 'opacity-0',
					)}
				/>
			</div>
		</>
	);
}
