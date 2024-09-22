'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface ActiveLinkProps extends LinkProps {
	children?: React.ReactNode;
	className?: string;
}

export default function ActiveLink(props: ActiveLinkProps) {
	const pathname = usePathname();
	const { children, className, ...otherProps } = props;

	const isActive = otherProps.href === pathname;

	return (
		<Link
			className={cn(
				'text-muted-foreground transition-colors hover:text-foreground',
				className,
				{ 'text-foreground': isActive },
			)}
			{...otherProps}
		>
			{children}
		</Link>
	);
}
