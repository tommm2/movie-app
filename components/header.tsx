'use client';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { useAuth } from '@/context/auth-context';
import { auth } from '@/lib/firebase';

import MobileNav from './mobile-nav';
import Nav from './nav';
import SignInDialog from './sign-in-modal';
import UserDropdown from './user-dropdown';

export default function Header() {
	const { user, isLoading } = useAuth();

	const handleSignInWithGoogle = async () => {
		const provider = new GoogleAuthProvider();

		await signInWithPopup(auth, provider)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const handleClickSignOut = async () => {
		await auth.signOut();
	};

	return (
		<header className='sticky top-0 z-10 mx-auto flex h-16 max-w-[90rem] items-center gap-4 border-b bg-background px-4 md:px-6'>
			<Nav />

			<div className='flex w-full items-center justify-end gap-4 md:gap-2'>
				{!isLoading && !user ? (
					<SignInDialog onSignInWithGoogle={handleSignInWithGoogle} />
				) : null}

				<UserDropdown
					user={user}
					onClickSignOut={handleClickSignOut}
				/>
			</div>

			<MobileNav />
		</header>
	);
}
