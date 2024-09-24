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
	description: 'Your favorite movie, all in one place.',
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
					{children}
					<Toaster />
				</AuthContextProvider>
			</body>
		</html>
	);
}
