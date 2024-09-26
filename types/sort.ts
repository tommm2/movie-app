export type SortBy = 'desc' | 'asc';
export type OrderBy = 'vote_average' | 'release_date' | 'popularity' | '';

export type SortOption = {
	label: string;
	value: OrderBy;
};
