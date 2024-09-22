'use client';

import { type User, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

import { auth } from '@/lib/firebase';

interface AuthContext {
	user: User | null;
	isLoading: boolean;
}

export const AuthContext = createContext<AuthContext>({
	user: null,
	isLoading: false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthContextProviderProps {
	children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setIsLoading(false);
		});
	}, []);

	return (
		<AuthContext.Provider value={{ user, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
}
