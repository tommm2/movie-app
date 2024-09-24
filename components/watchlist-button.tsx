'use client';

import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { Bookmark } from 'lucide-react';
import { MouseEvent, useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { type Movie } from '@/types/movie';

interface MovieCardProps {
	data: Movie;
	className?: string;
}

export default function WatchlistButton({ data, className }: MovieCardProps) {
	const { user } = useAuth();
	const { toast } = useToast();

	const [isInWatchlist, setIsInWatchlist] = useState(false);

	const { id: movieId, title } = data;

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
			data,
		);
	};

	const removeFromWatchlist = async () => {
		await deleteDoc(
			doc(db, 'users', user?.uid as string, 'watchlist', movieId.toString()),
		);
	};

	const handleUpdateWatchlist = async (e: MouseEvent) => {
		e.stopPropagation();

		if (!user) {
			toast({
				description: 'Please sign in to add movies to your watchlist.',
			});

			return;
		}

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
					<span className='font-bold'>{title}</span> was {isInWatchlist ? 'Removed from' : 'Added to'} your watchlist list.
				</div>
			),
		});
	};

	useEffect(() => {
		const fetchWatchlistStatus = async () => {
			if (user) {
				const inWatchlist = await checkIfInWatchlist();

				setIsInWatchlist(inWatchlist);
			} else {
				setIsInWatchlist(false);
			}
		};

		fetchWatchlistStatus();
	}, [user, checkIfInWatchlist]);

	return (
		<div
			className={cn('rounded-sm bg-secondary p-2', className)}
			onClick={handleUpdateWatchlist}
		>
			<Bookmark className={cn('size-5', { 'fill-primary': isInWatchlist })} />
		</div>
	);
}
