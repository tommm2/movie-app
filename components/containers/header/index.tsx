'use client';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Menu, Search } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/context/auth-context';
import { auth } from '@/lib/firebase';

import SignInDialog from './sign-in-modal';
import UserDropdown from './user-dropdown';

export default function Header() {
	const user = useAuth();

	const handleClickGoogleSignIn = async () => {
		const provider = new GoogleAuthProvider();

		await signInWithPopup(auth, provider)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const handleClickSignOut = async () => {
		await auth.signOut();
	};

	return (
		<header className='sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
			<nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
				<Link
					href='/'
					className='text-muted-foreground transition-colors hover:text-foreground'
				>
					Movies
				</Link>
			</nav>

			<div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
				<form className='ml-auto flex-1 sm:flex-initial'>
					<div className='relative'>
						<Search className='absolute left-2.5 top-2.5 size-4 text-muted-foreground' />
						<Input
							type='search'
							placeholder='Search movies...'
							className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
						/>
					</div>
				</form>

				{!user && (
					<SignInDialog onClickGoogleSignIn={handleClickGoogleSignIn} />
				)}

				<UserDropdown
					user={user}
					onClickSignOut={handleClickSignOut}
				/>
			</div>

			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant='outline'
						size='icon'
						className='shrink-0 md:hidden'
					>
						<Menu className='size-5' />
						<span className='sr-only'>Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side='left'>
					<nav className='grid gap-6 text-lg font-medium'>
						<Link
							href='#'
							className='flex items-center gap-2 text-lg font-semibold'
						>
							<span className='sr-only'>Acme Inc</span>
						</Link>
						<Link
							href='#'
							className='text-muted-foreground hover:text-foreground'
						>
							Dashboard
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
		</header>
	);
}
