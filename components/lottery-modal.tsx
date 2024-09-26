import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { getRandomMovie } from '@/lib/utils';
import { Movie } from '@/types/movie';

interface LotteryModalProps {
	watchlist: Movie[];
}

const SPIN_DURATION = 3000;
const SPIN_INTERVAL = 500;

export default function LotteryModal({ watchlist }: LotteryModalProps) {
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
	const [isSpinning, setIsSpinning] = useState(false);
	const router = useRouter();

	const handleGoToDetail = () => {
		if (selectedMovie) {
			router.push(`/detail/${selectedMovie.id}`);
		}
	};

	useEffect(() => {
		if (isSpinning) {
			let interval = setInterval(() => {
				setSelectedMovie(getRandomMovie(watchlist));
			}, SPIN_INTERVAL);

			let timeout = setTimeout(() => {
				setIsSpinning(false);
			}, SPIN_DURATION);

			return () => {
				clearInterval(interval);
				clearTimeout(timeout);
			};
		}
	}, [isSpinning, watchlist]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Movie Lottery</Button>
			</DialogTrigger>
			<DialogContent className='w-[90%]'>
				<DialogHeader>
					<DialogTitle>Movie Lottery</DialogTitle>
					<DialogDescription>
						Click the button to spin and select a random movie
					</DialogDescription>
				</DialogHeader>

				{watchlist.length > 0 ? (
					<div className='flex h-20 flex-col items-center justify-center space-y-4 overflow-hidden'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={selectedMovie ? selectedMovie.id : 'empty'}
								initial={{ y: 30, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: -30, opacity: 0 }}
								transition={{ duration: 0.3 }}
								className='text-xl font-bold'
							>
								{selectedMovie ? selectedMovie.title : 'Ready to spin'}
							</motion.div>
						</AnimatePresence>
					</div>
				) : (
					<div className='flex h-20 flex-col items-center justify-center space-y-4 overflow-hidden'>
						<p className='text-xl font-bold'>No movies in your watchlist</p>
					</div>
				)}

				{watchlist.length > 0 && (
					<Button
						className='w-full'
						onClick={() => setIsSpinning(true)}
						disabled={isSpinning}
					>
						{isSpinning ? 'Spinning...' : 'Start'}
					</Button>
				)}

				<DialogFooter>
					<Button
						type='button'
						variant='secondary'
						className='w-full'
						disabled={isSpinning || !selectedMovie}
						onClick={handleGoToDetail}
					>
						Go to movie
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
