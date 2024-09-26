import SearchMovies from './search-movies';

export default function Search() {
	return (
		<main className='mx-auto max-w-[90rem] p-4 pt-8'>
			<h1 className='mb-4 text-3xl font-bold'>Search</h1>

			<SearchMovies />
		</main>
	);
}
