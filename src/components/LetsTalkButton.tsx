'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import ContactForm from './ContactForm';

const LetsTalkButton = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const flipTl = useRef<GSAPTimeline | null>(null);
  const drawerTl = useRef<GSAPTimeline | null>(null);

  useEffect(() => {
    // Flip animation
    if (containerRef.current) {
      flipTl.current = gsap.timeline({ paused: true });
      flipTl.current.to(containerRef.current, {
        rotateY: 180,
        duration: 0.6,
        ease: 'power2.inOut',
      });
    }

    // Drawer animation (slide from right)
    if (drawerRef.current) {
      drawerTl.current = gsap.timeline({ paused: true });
      drawerTl.current.fromTo(
        drawerRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.7, ease: 'power3.inOut' }
      );
    }
  }, []);

  const toggleDrawer = () => {
    if (!isDrawerOpen) {
      drawerTl.current?.play();
    } else {
      drawerTl.current?.reverse();
    }
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* 3D Flip Button */}
      <div
        className="w-[160px] h-[60px] perspective"
        onClick={toggleDrawer}
        onMouseEnter={() => flipTl.current?.play()}
        onMouseLeave={() => flipTl.current?.reverse()}
      >
        <div
          ref={containerRef}
          className="relative w-full h-full preserve-3d transition-transform duration-100 cursor-pointer ease-in-out"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'center',
            willChange: 'transform',
          }}
        >
          {/* Front Face */}
          <div className="absolute inset-0 bg-white text-black flex items-center justify-center gap-2 px-4 py-2 font-medium backface-hidden">
            Let’s Talk
            <ArrowUpRight className="w-5 h-5" />
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 bg-[#FF0090] text-white flex items-center justify-center gap-2 px-4 py-2 font-medium backface-hidden"
            style={{ transform: 'rotateY(180deg)' }}
          >
            Let’s Chat
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Drawer */}
     {/* Fullscreen Drawer */}
{/* Right Half-Width Drawer */}
<div
  ref={drawerRef}
  className="fixed top-0 right-0 w-full sm:w-[45%] h-screen bg-black text-white z-50 shadow-lg overflow-hidden"
  style={{ transform: 'translateX(100%)' }}
>
  <ContactForm onClose={toggleDrawer} />
</div>


    </>
  );
};

export default LetsTalkButton;
