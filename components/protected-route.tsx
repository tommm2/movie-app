'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/context/auth-context';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const user = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push('/');
		}
	}, [user, router]);

	return user ? children : null;
}
