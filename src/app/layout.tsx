// ❌ DO NOT add "use client" here!
import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import ClientWrapper from '@/components/ClientWrapper';

export const metadata: Metadata = {
  title: 'GSAP Homepage',
  description: 'Next.js + GSAP animated homepage',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen" cz-shortcut-listen="true">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
