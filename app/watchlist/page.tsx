'use client';

import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import MovieCard from '@/components/movie-card';
import ProtectedRoute from '@/components/protected-route';
import SortControl from '@/components/sort-control';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { sortMovies } from '@/lib/utils';
import { Movie } from '@/types/movie';
import type { OrderBy, SortBy } from '@/types/sort';

export default function Watchlist() {
	const { user } = useAuth();
	const [orderBy, setOrderBy] = useState<OrderBy>('');
	const [sortBy, setSortBy] = useState<SortBy>('desc');
	const [watchlist, setWatchlist] = useState([]);

	const sortedMovies = sortMovies({ orderBy, sortBy, data: watchlist });

	useEffect(() => {
		if (user) {
			getDocs(collection(db, 'users', user.uid as string, 'watchlist'))
				.then((querySnapshot) => {
					const data = querySnapshot.docs.map((doc) => ({
						...doc.data(),
					}));

					setWatchlist(data as any);
				});
		}
	}, [user]);

	return (
		<ProtectedRoute>
			<main className='mx-auto max-w-[90rem] p-4 pt-8'>
				<h1 className='mb-4 flex items-center gap-2 text-3xl font-bold'>
					Watchlist
				</h1>

				<SortControl
					orderBy={orderBy}
					sortBy={sortBy}
					onOrderBy={setOrderBy}
					onSortBy={setSortBy}
				/>

				{watchlist.length > 0 ? (
					<div className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
						{sortedMovies.map((item: Movie) => {
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
