'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import LetsTalkButton from './LetsTalkButton';

const Navbar = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsWrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const tl = useRef<GSAPTimeline | null>(null);
  const [slideDistance, setSlideDistance] = useState(0);

  useEffect(() => {
    // Dynamically calculate exact distance between nav items and menu box
    const calculateDistance = () => {
      if (itemsWrapperRef.current && menuRef.current) {
        const itemsRight = itemsWrapperRef.current.getBoundingClientRect().right;
        const menuLeft = menuRef.current.getBoundingClientRect().left;
        const offset = itemsRight - menuLeft + 8; // +8 for slight gap
        setSlideDistance(offset);
      }
    };

    // Run once after mount
    calculateDistance();

    // Recalculate on window resize
    window.addEventListener('resize', calculateDistance);
    return () => window.removeEventListener('resize', calculateDistance);
  }, []);

  const toggleMenu = () => {
    if (!tl.current) {
      tl.current = gsap.timeline({ paused: true });

      tl.current
        .to(menuRef.current, {
          x: slideDistance-12,
          duration: 1.2,
          ease: 'power3.inOut',
          backgroundColor: '#2d3748',
          color: '#ffffff',
        })
        .to(
          itemsWrapperRef.current,
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: 'power3.inOut',
          },
          '<'
        );
    }

    if (!isOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }

    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full h-[80px]  text-white flex items-center justify-between px-4 fixed top-0 z-50 mt-6">

      <div className='flex '>
          <div className="w-16 h-16 bg-[#FF0090] text-black font-medium text-[18px] flex items-center justify-center mr-0">
        Huge
      </div>

      <div className="relative flex items-center py-0">
        <div
          ref={itemsWrapperRef}
          className="flex items-center justify-center h-full px-6 space-x-8 text-[18px] font-medium absolute left-0 top-0 opacity-0 pointer-events-none bg-gray-500"
          style={{ transform: 'translateX(0)' }}
        >
          <Link href="#about" className="hover:underline">
            About
          </Link>
          <Link href="#career" className="hover:underline">
            Career
          </Link>
          <Link href="#team" className="hover:underline">
            Team
          </Link>
          <Link href="#contact" className="hover:underline">
            Contact
          </Link>
        </div>

        <div
          ref={menuRef}
          onClick={toggleMenu}
          className={`w-16 h-16 flex items-center justify-center cursor-pointer relative z-10 ${
            isOpen ? 'bg-gray-800 text-white' : 'bg-white text-black'
          }`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </div>
      </div>
      </div>
    

    <LetsTalkButton />
    </nav>
  );
};

export default Navbar;
