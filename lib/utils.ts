import { Movie } from "@/types/movie";
import type { OrderBy, SortBy } from "@/types/sort";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
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
		return sortBy === 'desc'
			? b[orderBy] - a[orderBy]
			: a[orderBy] - b[orderBy];
	});
}
