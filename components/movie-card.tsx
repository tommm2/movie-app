'use client';

import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { Bookmark } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEvent, useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';

interface MovieCardProps {
	id: number;
	title: string;
	posterPath: string;
}

export default function MovieCard({ id, posterPath, title }: MovieCardProps) {
	const { user } = useAuth();
	const [isLoading, setIsLoading] = useState(true);
	const [isInWatchlist, setIsInWatchlist] = useState(false);
	const { toast } = useToast();
	const router = useRouter();

	const handleClick = () => {
		router.push(`/detail/${id}`);
	};

	const checkIfInWatchlist = useCallback(async () => {
		const docRef = doc(
			db,
			'users',
			user?.uid as string,
			'watchlist',
			id.toString(),
		);
		const docSnap = await getDoc(docRef);

		return docSnap.exists();
	}, [user, id]);

	const addToWatchlist = async () => {
		const data = { id, title, posterPath };
		await setDoc(
			doc(db, 'users', user?.uid as string, 'watchlist', id.toString()),
			data,
		);
	};

	const removeFromWatchlist = async () => {
		await deleteDoc(
			doc(db, 'users', user?.uid as string, 'watchlist', id.toString()),
		);
	};

	const handleUpdateWatchlist = async (e: MouseEvent) => {
		e.stopPropagation();

		if (await checkIfInWatchlist()) {
			await removeFromWatchlist();
			toast({
				description: (
					<div>
						<span className='font-bold'>{title}</span> was removed from your
						watchlist list.
					</div>
				),
			});
			setIsInWatchlist(false);
		} else {
			await addToWatchlist();
			toast({
				description: (
					<div>
						<span className='font-bold'>{title}</span> was added to your
						watchlist list.
					</div>
				),
			});
			setIsInWatchlist(true);
		}
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
			className='group relative cursor-pointer'
			onClick={handleClick}
		>
			{user && (
				<div
					className='absolute right-2 top-2 rounded-sm bg-secondary p-2'
					onClick={handleUpdateWatchlist}
				>
					<Bookmark className={cn('size-5', { 'fill-primary': isInWatchlist })} />
				</div>
			)}
			<Image
				src={`https://image.tmdb.org/t/p/original/${posterPath}`}
				alt={title}
				width={300}
				height={400}
				priority
				className={cn('w-full rounded-sm transition-all', {
					'blur-lg': isLoading,
				})}
				onLoad={() => setIsLoading(false)}
			/>
		</div>
	);
}
