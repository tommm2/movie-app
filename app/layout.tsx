import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/components/header';
import { AuthContextProvider } from '@/context/auth-context';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		default: 'Moviez',
		template: '%s - Moviez',
	},
	openGraph: {
		type: 'video.movie',
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
					{children}
				</AuthContextProvider>
			</body>
		</html>
	);
}
