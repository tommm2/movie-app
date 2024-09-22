'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';

import ActiveLink from '@/components/active-link';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { navLinks } from '@/configs/nav-links';

export default function MobileNav() {
	const [open, setOpen] = useState(false);

	return (
		<Sheet
			open={open}
			onOpenChange={setOpen}
		>
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
				<SheetHeader>
					<SheetTitle>Navigation</SheetTitle>
				</SheetHeader>
				<nav className='grid gap-2 text-lg font-medium'>
					{navLinks.map((link) => (
						<ActiveLink
							key={link.href}
							href={link.href}
							className='flex items-center text-base'
							onClick={() => setOpen(false)}
						>
							{link.label}
						</ActiveLink>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
}
