import ProtectedRoute from '@/components/protected-route';

export default function Watchlist() {
	return (
		<ProtectedRoute>
			<main>watchlist</main>
		</ProtectedRoute>
	);
}
