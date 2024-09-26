import { Star } from 'lucide-react';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getMovieDetail } from '@/actions/movie';
import BlurImage from '@/components/blur-image';
import WatchlistButton from '@/components/watchlist-button';
import type { Credits, Genre } from '@/types/movie';

interface DetailProps {
	params: { id: number };
}

export const generateMetadata = async ({
	params,
}: DetailProps): Promise<Metadata | undefined> => {
	const data = await getMovieDetail(params.id);

	if (!data.success) {
		return;
	}

	const { title, overview } = data;

	return {
		title,
		description: overview,
		openGraph: {
			type: 'video.movie',
			title,
			description: overview,
		},
	};
};

export default async function Detail({ params }: DetailProps) {
	const data = await getMovieDetail(params.id);

	if (!data.id) {
		return notFound();
	}

	const {
		poster_path,
		title,
		release_date,
		runtime,
		vote_average,
		overview,
		genres,
		credits = {},
	} = data;

	const director = (credits as Credits).crew.find(
		(crew) => crew.job === 'Director',
	);

	const casts = (credits as Credits).cast
		.sort((a, b) => b.popularity - a.popularity)
		.slice(0, 5);

	const genresTexts = genres.map(({ name }: Genre) => name).join(', ');

	return (
		<main className='mx-auto max-w-[90rem] p-4 pt-8'>
			<div className='flex flex-col gap-10 md:flex-row'>
				<BlurImage
					src={
						poster_path
							? `https://image.tmdb.org/t/p/original/${poster_path}`
							: '/images/img-placeholder.jpg'
					}
					alt={title || ''}
					width={300}
					height={450}
					className='h-full shrink-0 sm:h-[450px]'
					imageClassName='w-full sm:w-auto rounded-lg object-cover shadow-lg h-full'
				/>

				<div>
					<h2 className='text-3xl font-bold'>{title}</h2>

					<p className='mb-4 text-muted-foreground'>
						{release_date} • {genresTexts} • {runtime} minutes
					</p>

					<div className='mb-10 flex items-center gap-4'>
						<WatchlistButton
							className='flex w-fit'
							movie={data}
						>
							Watchlist
						</WatchlistButton>
						<div className='flex items-center gap-2'>
							<Star className='size-5 text-[#facc15]' />
							<div className='flex'>
								<span className='text-[#facc15]'>
									{vote_average.toFixed(1)}
								</span>
								/ 10
							</div>
						</div>
					</div>

					<h3 className='text-2xl font-bold'>Overview</h3>
					<p className='mb-10 text-muted-foreground'>{overview}</p>

					<h3 className='text-2xl font-bold'>Director</h3>
					<p className='mb-10 text-muted-foreground'>{director?.name}</p>

					<h3 className='text-2xl font-bold'>Casts</h3>
					<ul className='flex flex-col gap-3 sm:flex-row'>
						{casts.map((cast) => (
							<li
								key={cast.id}
								className='text-muted-foreground'
							>
								{cast?.name}
							</li>
						))}
					</ul>
				</div>
			</div>
		</main>
	);
}
