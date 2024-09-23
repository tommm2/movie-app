import { getMovies } from '@/actions/movie';
import MovieList from '@/components/movie-list';

export default async function Home() {
	const movies = await getMovies();

	return (
		<>
			<h1 className='mb-4 text-2xl font-bold'>Movies</h1>
			<MovieList initialMovies={movies} />
		</>
	);
}
