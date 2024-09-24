import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { AuthContextProvider } from '@/context/auth-context';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		default: 'Moviez',
		template: '%s - Moviez',
	},
	openGraph: {
		type: 'website',
		siteName: 'Moviez',
		title: 'Moviez',
	},
	description: 'Happy watching movie !!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<AuthContextProvider>
					<Header />
					<main className='mx-auto max-w-[90rem] p-4 pt-8'>{children}</main>
					<Toaster />
				</AuthContextProvider>
			</body>
		</html>
	);
}
