'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { getSearchMovies } from '@/actions/movie';
import MovieCard from '@/components/movie-card';
import SortControl from '@/components/sort-control';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIntersection } from '@/hooks/use-intersection';
import { getUniqueMovies, sortMovies } from '@/lib/utils';
import { type Movie } from '@/types/movie';
import type { OrderBy, SortBy } from '@/types/sort';

export default function SearchMovies() {
	const { ref, isIntersecting } = useIntersection();

	const [query, setQuery] = useState('');
	const [movies, setMovies] = useState<Movie[]>([]);
	const [hasSearched, setHasSearched] = useState(false);
	const [orderBy, setOrderBy] = useState<OrderBy>('');
	const [sortBy, setSortBy] = useState<SortBy>('desc');
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);

	const sortedMovies = sortMovies({ orderBy, sortBy, data: movies });

	const fetchMovies = (searchPage: number, isNewSearch: boolean) => {
    setIsLoading(true);

    if (isNewSearch) {
      setHasSearched(true);
      setPage(1);
      setMovies([]);
    }

    getSearchMovies(query, searchPage)
      .then((data) => {
        setMovies((prevMovies) => isNewSearch ? data : getUniqueMovies(prevMovies, data));
        setPage(searchPage);
      })
      .finally(() => setIsLoading(false));
  };

	const handleSearch = () => fetchMovies(1, true);

	const loadMore = () => {
    if (isLoading || !hasSearched) return;

    fetchMovies(page + 1, false);
  };

	useEffect(() => {
    if (isIntersecting && hasSearched) {
      loadMore();
    }
  }, [isIntersecting, hasSearched]);

	return (
		<>
			<div className='mb-4 flex flex-col gap-4 md:flex-row'>
				<Input
					className='w-full md:w-80'
					placeholder='Search movies'
					onChange={(e) => setQuery(e.target.value)}
				/>
				<Button onClick={handleSearch}>Search</Button>
				<SortControl
					orderBy={orderBy}
					sortBy={sortBy}
					onOrderBy={setOrderBy}
					onSortBy={setSortBy}
				/>
			</div>

			{sortedMovies.length > 0 && (
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
			)}

			{!isLoading && hasSearched && movies.length === 0 && (
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
