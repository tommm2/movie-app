import ActiveLink from '@/components/active-link';
import { navLinks } from '@/configs/nav-links';

export default function Nav() {
	return (
		<nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
			{navLinks.map((link) => (
				<ActiveLink
					key={link.href}
					href={link.href}
					className='text-muted-foreground transition-colors hover:text-foreground'
				>
					{link.label}
				</ActiveLink>
			))}
		</nav>
	);
}
