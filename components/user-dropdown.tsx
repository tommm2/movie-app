'use client';

import { type User } from 'firebase/auth';
import { ListVideo, LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface UserDropdownProps {
	user: User | null;
	onClickSignOut: () => void;
}

export default function UserDropdown({
	user,
	onClickSignOut,
}: UserDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className='border shadow-sm focus:outline-none'>
					<AvatarImage
						src={user?.photoURL ?? undefined}
						alt={user?.displayName ?? 'Guest User'}
					/>
					<AvatarFallback asChild>
						<Image
							src='/images/user-placeholder.jpg'
							alt={user?.displayName ?? 'Guest User'}
							width={40}
							height={40}
							className='invert'
						/>
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>
					{user?.displayName ?? 'Guest user'}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link
						className={cn({
							'pointer-events-none text-muted-foreground': !user,
						})}
						href='/watchlist'
					>
						<ListVideo className='mr-2 size-4' />
						Watch list
					</Link>
				</DropdownMenuItem>

				{user && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={onClickSignOut}>
							<LogOutIcon className='mr-2 size-4' />
							Logout
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
