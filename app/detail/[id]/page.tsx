import Image from 'next/image';

import { getMovieDetail } from '@/actions/movie';
import type { Credits, Genre } from '@/types/movie';

interface DetailProps {
	params: { id: number };
}

export default async function Detail({ params }: DetailProps) {
	const detail = await getMovieDetail(params.id);

	const {
		poster_path,
		title,
		release_date,
		runtime,
		vote_average,
		overview,
		genres,
		credits = {},
	} = detail;

	const director = (credits as Credits).crew
		.find((crew) => crew.job === 'Director')

	const topFivePopularCast = (credits as Credits).cast
			.sort((a, b) => b.popularity - a.popularity)
			.slice(0, 5);

	return (
		<main className='mx-auto max-w-[90rem] px-4 py-8'>
			<div className='flex flex-col gap-4 md:flex-row'>
				<div className='flex-1'>
					<Image
						src={`https://image.tmdb.org/t/p/original/${poster_path}`}
						alt={title || ''}
						width={400}
						height={500}
						className='w-auto rounded-lg object-cover shadow-lg'
					/>
				</div>

				<div className='flex-1'>
					<h1 className='mb-2 text-3xl font-bold'>{title}</h1>
					<p className='mb-4 text-muted-foreground'>
						{release_date} • {runtime} minutes
					</p>

					<div className='mb-4 flex items-center'>
						<span className='text-xl font-bold text-yellow-400'>
							{vote_average.toFixed(1)}
						</span>
						<span className='ml-2 text-muted-foreground'>/ 10</span>
					</div>

					<p className='mb-4 text-lg text-muted-foreground'>{overview}</p>

					<div className='mb-4'>
						<h2 className='mb-2 text-xl font-semibold'>Director</h2>
						<p>{director?.name}</p>
					</div>

					<div className='mb-4'>
						<h2 className='mb-2 text-xl font-semibold'>Genres</h2>
						<div className='flex flex-wrap gap-2'>
							{genres.map((genre: Genre) => (
								<span
									key={genre.id}
									className='rounded-full bg-secondary px-3 py-1 text-sm text-foreground'
								>
									{genre.name}
								</span>
							))}
						</div>
					</div>

					<div>
						<h2 className='mb-2 text-xl font-semibold'>Cast</h2>
						<ul className='list-inside list-disc'>
							{topFivePopularCast.map((actor) => (
								<li key={actor.id}>{actor.name}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</main>
	);
}
