import { Movie } from '@/types/movie';
import type { OrderBy, SortBy } from '@/types/sort';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

function convertStringToTimestamp(value: string) {
	return new Date(value).getTime();
}

export function sortMovies({
	orderBy,
	sortBy,
	data,
}: {
	orderBy: OrderBy;
	sortBy: SortBy;
	data: Movie[];
}) {
	if (!orderBy) return data;

	return data.sort((a: any, b: any) => {
		const valueA = orderBy === 'release_date' ? convertStringToTimestamp(a[orderBy]) : a[orderBy];
		const valueB = orderBy === 'release_date' ? convertStringToTimestamp(b[orderBy]) : b[orderBy];

		return sortBy === 'desc'
			? valueB - valueA
			: valueA - valueB;
	});
}

export function getUniqueMovies(prevMovies: Movie[], newMovies: Movie[]) {
	const movieIdSet = new Set(prevMovies.map((movie) => movie.id));

	const filteredMovies = newMovies.filter(
		(movie: Movie) => !movieIdSet.has(movie.id),
	);

	return [...prevMovies, ...filteredMovies];
}

export function getRandomMovie(watchlist: Movie[]) {
	return watchlist[Math.floor(Math.random() * watchlist.length)];
}
