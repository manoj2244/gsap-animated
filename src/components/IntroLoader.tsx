'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const IntroLoader = ({ onComplete }: { onComplete: () => void }) => {
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const helloRef = useRef<HTMLDivElement>(null);
  const weAreRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 100;
    const interval = duration / steps;
    let current = 0;

    const intervalId = setInterval(() => {
      current += 1;
      setPercent(current);

      // Animate background bar from bottom to top
      gsap.to(barRef.current, {
        height: `${current}%`,
        duration: 0.2,
        ease: 'power1.out',
      });

      if (current === 50) {
        // Animate Hello out and We Are in simultaneously at same position
        gsap.to(helloRef.current, {
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: 'power2.out',
        });

        gsap.to(weAreRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      }

      if (current >= 100) {
        clearInterval(intervalId);

        // Hold 3 seconds, then run curtain split animation
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: onComplete,
          });

          // Fade out the "We Are" text moving up
          tl.to(weAreRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
          });

          // Animate left curtain sliding left off-screen
          tl.to(
            leftCurtainRef.current,
            {
              x: '-100%',
              duration: 1,
              ease: 'power2.inOut',
            },
            'curtain'
          );

          // Animate right curtain sliding right off-screen (start at same time)
          tl.to(
            rightCurtainRef.current,
            {
              x: '100%',
              duration: 1,
              ease: 'power2.inOut',
            },
            'curtain'
          );
        }, 2000);
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden flex items-center justify-center">
      {/* Left curtain covers left half of screen */}
      <div
        ref={leftCurtainRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-black"
        style={{ transformOrigin: 'left center' }}
      />

      {/* Right curtain covers right half of screen */}
      <div
        ref={rightCurtainRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-black"
        style={{ transformOrigin: 'right center' }}
      />

      {/* Animated gray bar from bottom - full width behind curtains */}
      <div
        ref={barRef}
        className="absolute bottom-0 left-0 w-full bg-gray-900"
        style={{ height: '0%', zIndex: 10 }}
      />

      {/* Large background percent */}
      <div className="text-[30vw] font-extrabold opacity-10 absolute z-20 select-none">
        {percent}%
      </div>

      {/* Container for Hello and We Are - stacked absolutely */}
      <div className="relative z-30 w-full max-w-full h-[10rem] md:h-[10rem] flex items-center justify-center pointer-events-none">
        <div
          ref={helloRef}
          className="absolute text-[10rem] md:text-[10rem] font-bold"
          style={{ opacity: 1, transform: 'translateY(0)' }}
        >
          Hello
        </div>
        <div
          ref={weAreRef}
          className="absolute text-[10rem] md:text-[10rem] font-extrabold opacity-0"
          style={{ transform: 'translateY(50px)' }}
        >
          We Are
        </div>
      </div>
    </div>
  );
};

export default IntroLoader;
