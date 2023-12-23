import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers';

const poppins = Poppins({ weight: ['400'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jobify',
  description: 'Jobify for job',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
