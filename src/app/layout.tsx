import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Inter } from 'next/font/google';
import './globals.css';
import { Container, Typography } from '@mui/material';

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
          <Container>
            <Typography variant="h1">HEADER</Typography>
          </Container>

          <Container>{children}</Container>

          <Container>
            <Typography variant="h1">FOOTER</Typography>
          </Container>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
