'use client';

import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { Bookmark, Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEvent, useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { type Movie } from '@/types/movie';

interface MovieCardProps {
	movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
	const router = useRouter();
	const { user } = useAuth();
	const { toast } = useToast();

	const [isLoading, setIsLoading] = useState(true);
	const [isInWatchlist, setIsInWatchlist] = useState(false);

	const { id: movieId, title, poster_path, vote_average } = movie;

	const handleNavigate = () => {
		router.push(`/detail/${movie.id}`);
	};

	const checkIfInWatchlist = useCallback(async () => {
		const docRef = doc(
			db,
			'users',
			user?.uid as string,
			'watchlist',
			movieId.toString(),
		);
		const docSnap = await getDoc(docRef);

		return docSnap.exists();
	}, [user, movieId]);

	const addToWatchlist = async () => {
		await setDoc(
			doc(db, 'users', user?.uid as string, 'watchlist', movieId.toString()),
			movie,
		);
	};

	const removeFromWatchlist = async () => {
		await deleteDoc(
			doc(db, 'users', user?.uid as string, 'watchlist', movieId.toString()),
		);
	};

	const handleUpdateWatchlist = async (e: MouseEvent) => {
		e.stopPropagation();

		if (await checkIfInWatchlist()) {
			await removeFromWatchlist();

			setIsInWatchlist(false);
		} else {
			await addToWatchlist();

			setIsInWatchlist(true);
		}

		toast({
			description: (
				<div>
					<span className='font-bold'>{title}</span>was {isInWatchlist ? 'Removed from' : 'Added to'} your watchlist list.
				</div>
			),
		});
	};

	useEffect(() => {
		const fetchWatchlistStatus = async () => {
			if (user) {
				const inWatchlist = await checkIfInWatchlist();

				setIsInWatchlist(inWatchlist);
			}
		};

		fetchWatchlistStatus();
	}, [user, checkIfInWatchlist]);

	return (
		<div
			className='group relative cursor-pointer'
			onClick={handleNavigate}
		>
			<Image
				src={`https://image.tmdb.org/t/p/original/${poster_path}`}
				alt={movie.title}
				width={300}
				height={400}
				priority
				className={cn('w-full rounded-sm transition-all', {
					'blur-md': isLoading,
				})}
				onLoad={() => setIsLoading(false)}
			/>

			{user && (
				<div
					className='absolute right-2 top-2 rounded-sm bg-secondary p-2'
					onClick={handleUpdateWatchlist}
				>
					<Bookmark
						className={cn('size-5', { 'fill-primary': isInWatchlist })}
					/>
				</div>
			)}

			<div className='mt-2 flex items-center justify-between'>
				<h2 className='line-clamp-1 w-full text-xl font-bold'>{movie.title}</h2>

				<div className='flex flex-row items-center gap-2'>
					<Star className='text-[#FFAD49]' />
					<p className='font-bold text-[#FFAD49]'>
						{vote_average ? vote_average.toFixed(1) : ''}
					</p>
				</div>
			</div>
		</div>
	);
}
