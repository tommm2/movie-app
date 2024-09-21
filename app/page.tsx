import { getMovies } from '@/actions/movie';
import MovieList from '@/components/movie-list';

export default async function Home() {
	const movies = await getMovies();

	return (
		<main className='mx-auto max-w-[90rem] p-4 pt-8'>
			<h1 className='mb-4 text-2xl font-bold'>Discover your Movie</h1>
			<MovieList initialMovies={movies} />
		</main>
	);
}
