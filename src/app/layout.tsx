import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Inter } from 'next/font/google';
import './globals.css';
import { Container, Typography } from '@mui/material';
import Header from './header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <Container maxWidth={false} disableGutters>
            <Header />
          </Container>

          <Container
            sx={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'top',
            }}
          >
            {children}
          </Container>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
