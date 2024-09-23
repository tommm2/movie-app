'use client';

import { collection, getDocs } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

import MovieCard from '@/components/movie-card';
import ProtectedRoute from '@/components/protected-route';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';

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
			<h1 className='mb-4 text-2xl font-bold'>Watchlist</h1>
			<div className='grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
				{watchlist.map((item: any) => {
					return (
						<MovieCard
							key={item.id}
							id={item.id}
							title={item.title}
							posterPath={item.posterPath}
						/>
					);
				})}
			</div>
		</ProtectedRoute>
	);
}
