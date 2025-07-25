"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";

const images = [
  "/images/front.jpeg",
  "/images/back.jpeg",
  "/images/left.jpeg",
  "/images/right.jpeg",
];

export default function HomePage() {
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const scrollBtnRef = useRef<HTMLButtonElement>(null);

  // State for background image index (cycling images)
  const [bgIndex, setBgIndex] = useState(0);
  // State for background opacity control (fade in/out on hover)
  const [bgOpacity, setBgOpacity] = useState(0);

  const slideshowInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Lock scroll during curtain animation
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        // Enable scroll after animation
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
      },
    });

    tl.fromTo(
      dividerRef.current,
      { height: "0%" },
      { height: "100%", duration: 1.2, ease: "power2.inOut" }
    )
      .to(leftCurtainRef.current, {
        duration: 1.5,
        x: "-100vw",
        ease: "power2.inOut",
      })
      .to(
        rightCurtainRef.current,
        {
          duration: 1.5,
          x: "100vw",
          ease: "power2.inOut",
        },
        "<"
      )
      .to(
        curtainRef.current,
        {
          duration: 0.2,
          opacity: 0,
          pointerEvents: "none",
          onComplete: () => {
            if (curtainRef.current) curtainRef.current.style.display = "none";
          },
        },
        ">"
      )
      .to(
        mainContentRef.current,
        {
          duration: 0,
          opacity: 1,
        },
        "<"
      )
      // Rotate cube once on load
      .fromTo(
        cubeRef.current,
        { rotationY: -90 },
        {
          rotationY: 270,
          duration: 4,
          ease: "none",
          transformOrigin: "center",
        },
        ">"
      );

    // Start cycling background images every 300ms continuously
    slideshowInterval.current = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 300);

    return () => {
      if (slideshowInterval.current) clearInterval(slideshowInterval.current);
    };
  }, []);

  // Cursor-following button logic
  useEffect(() => {
    const btn = scrollBtnRef.current;
    if (!btn) return;



    gsap.set(btn, { opacity: 0, x: -9999, y: -9999 });

    function onMouseMove(e: MouseEvent) {
      const cursorX = e.clientX;
      const cursorY = e.clientY;

      // Hide button if cursor leaves viewport
      if (
        cursorX < 0 ||
        cursorY < 0 ||
        cursorX > window.innerWidth ||
        cursorY > window.innerHeight
      ) {
        gsap.to(btn, { duration: 0.3, opacity: 0, x: -9999, y: -9999 });
        return;
      }
      // @ts-expect-error


      const btnRect = btn.getBoundingClientRect();
      const btnWidth = btnRect.width;
      const btnHeight = btnRect.height;

      let btnX = cursorX + 15; // offset right side
      let btnY = cursorY - btnHeight / 2;

      // Flip to left side if too close to right edge
      if (btnX + btnWidth > window.innerWidth) {
        btnX = cursorX - btnWidth - 15;
      }

      // Keep inside vertical bounds
      if (btnY < 0) btnY = 0;
      if (btnY + btnHeight > window.innerHeight)
        btnY = window.innerHeight - btnHeight;

      // Animate button position and fade in
      gsap.to(btn, {
        duration: 0.15,
        x: btnX,
        y: btnY,
        opacity: 1,
        ease: "power3.out",
      });
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // On hover, fade background to 0.7 opacity
  const handleMouseEnter = () => {
    setBgOpacity(0.7);
  };

  // On hover out, fade background to 0 opacity
  const handleMouseLeave = () => {
    setBgOpacity(0);
  };

  return (
    <>
      {/* Curtain overlay */}
      <div
        ref={curtainRef}
        className="fixed top-0 left-0 w-screen h-screen flex z-[9999] overflow-hidden"
      >
        <div
          ref={leftCurtainRef}
          className="w-1/2 h-full bg-gray-900 border-r-2 border-gray-700 shadow-inner relative"
        >
          <div
            ref={dividerRef}
            className="absolute right-0 top-0 w-0.5 bg-gray-500"
            style={{ height: 0 }}
          />
        </div>
        <div
          ref={rightCurtainRef}
          className="w-1/2 h-full bg-gray-900 border-l-2 border-gray-700 shadow-inner"
        />
      </div>

      {/* Fullscreen background slideshow behind everything */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${images[bgIndex]})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            opacity: 0.7 * bgOpacity,
            transition: "opacity 0.5s ease-in-out, background-image 0.3s ease-in-out",
          }}
        />
        <div
          className="absolute inset-0 bg-black"
          style={{
            opacity: 0.2 * bgOpacity,
            transition: "opacity 0.5s ease-in-out",
          }}
        />
      </div>

      {/* Main content with 3D cube */}
      <main
        ref={mainContentRef}
        className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center opacity-1 text-white transition-opacity duration-300"
      >
        <div
          ref={cubeRef}
          className="relative w-[300px] h-[300px] rounded-lg shadow-lg cursor-pointer perspective-[1000px]"
          style={{
            zIndex: 10,
            willChange: "transform",
            transformStyle: "preserve-3d",
            cursor: "pointer",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Cube faces */}
          <div
            className="absolute w-full h-full rounded-lg shadow-md [transform:translateZ(150px)]"
            style={{ backfaceVisibility: "hidden" }}
          >
            <img
              src="/images/front.jpeg"
              alt="Front"
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
          </div>
          <div
            className="absolute w-full h-full rounded-lg shadow-md [transform:rotateY(180deg)_translateZ(150px)]"
            style={{ backfaceVisibility: "hidden" }}
          >
            <img
              src="/images/back.jpeg"
              alt="Back"
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
          </div>
          <div
            className="absolute w-full h-full rounded-lg shadow-md [transform:rotateY(-90deg)_translateZ(150px)]"
            style={{ backfaceVisibility: "hidden" }}
          >
            <img
              src="/images/left.jpeg"
              alt="Left"
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
          </div>
          <div
            className="absolute w-full h-full rounded-lg shadow-md [transform:rotateY(90deg)_translateZ(150px)]"
            style={{ backfaceVisibility: "hidden" }}
          >
            <img
              src="/images/right.jpeg"
              alt="Right"
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
          </div>
        </div>
      </main>

      {/* Scroll to Explore button that follows cursor */}
    <button
  ref={scrollBtnRef}
  style={{
    position: "fixed",
    top: -60,
    left: 0,
    padding: "12px 24px",
    backgroundColor: "rgba(255, 255, 255, 0)", // transparent bg
    border: "2px solid white",
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
  
    pointerEvents: "none",
    userSelect: "none",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transform: "translate(0px, 0px)",
    willChange: "transform, opacity, border-color",
    zIndex: -20,
    cursor: "default",
    transition: " 0.2s ease, color 0.2s ease",
  }}
  aria-label="Scroll to Explore"
>
  Scroll to Explore
<ArrowDown className="h-6 w-6 text-pink-800" />
</button>

    </>
  );
}
