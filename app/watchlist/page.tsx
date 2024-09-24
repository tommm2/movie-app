'use client';

import { collection, getDocs } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

import MovieCard from '@/components/movie-card';
import ProtectedRoute from '@/components/protected-route';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { Movie } from '@/types/movie';

export default function Watchlist() {
	const { user } = useAuth();
	const [watchlist, setWatchlist] = useState([]);

	const getWatchlist = useCallback(async () => {
		if (user) {
			const querySnapshot = await getDocs(
				collection(db, 'users', user.uid as string, 'watchlist'),
			);

			const data = querySnapshot.docs.map((doc) => ({
				...doc.data(),
			}));

			setWatchlist(data as any);
		}
	}, [user]);

	useEffect(() => {
		getWatchlist();
	}, [getWatchlist]);

	return (
		<ProtectedRoute>
			<main className='mx-auto max-w-[90rem] p-4 pt-8'>
				<h1 className='mb-4 flex items-center gap-2 text-3xl font-bold'>
					Watchlist
				</h1>

				{watchlist.length > 0 ? (
					<div className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
						{watchlist.map((item: Movie) => {
							return (
								<MovieCard
									key={item.id}
									movie={item}
								/>
							);
						})}
					</div>
				) : (
					<p className='text-center'>No movies in your watchlist</p>
				)}
			</main>
		</ProtectedRoute>
	);
}
