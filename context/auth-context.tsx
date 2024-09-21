'use client';

import { type User, onAuthStateChanged } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

import { auth } from '@/lib/firebase';

export const AuthContext = createContext<User | null>(null);

export const useAuth = () => useContext<User | null>(AuthContext);

interface AuthContextProviderProps {
	children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={user}>
			{children}
		</AuthContext.Provider>
	);
}
