import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/components/containers/header';
import { AuthContextProvider } from '@/context/auth-context';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Movie App',
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
