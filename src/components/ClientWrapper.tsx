'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import IntroLoader from './IntroLoader';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <IntroLoader onComplete={() => setIsLoaded(true)} />}
      {isLoaded && (
        <>
          <Navbar />
          <main className="pt-20 px-6">{children}</main>
        </>
      )}
    </>
  );
}
