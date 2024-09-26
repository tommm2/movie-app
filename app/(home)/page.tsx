import Movies from './movies';

export default function Home() {
	return (
		<main className='mx-auto max-w-[90rem] p-4 pt-8'>
			<h1 className='mb-4 text-3xl font-bold'>Movies</h1>

			<Movies />
		</main>
	);
}
