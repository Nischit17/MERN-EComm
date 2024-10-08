import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const ErrorPage = () => {
  const errorRef = useRef(null); // Reference for the 404 text
  const circleRef = useRef(null); // Reference for the SVG
  const linkRef = useRef(null); // Reference for the 'Go Home' button

  useEffect(() => {
    // GSAP Animations for initial appearance
    gsap.fromTo(
      errorRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "bounce.out" }
    );

    gsap.fromTo(
      circleRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.7)", delay: 0.5 }
    );

    gsap.fromTo(
      linkRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out", delay: 1 }
    );

    // GSAP Hover Animation for 'Go Home' Button
    const hoverAnimation = gsap.to(linkRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power1.inOut",
      paused: true, // Start paused until hover
    });

    // Event listeners for hover
    const handleMouseEnter = () => hoverAnimation.play();
    const handleMouseLeave = () => hoverAnimation.reverse();

    // Attach event listeners
    linkRef.current.addEventListener("mouseenter", handleMouseEnter);
    linkRef.current.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup function to remove event listeners
    return () => {
      linkRef.current.removeEventListener("mouseenter", handleMouseEnter);
      linkRef.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 ref={errorRef} className="text-9xl font-bold mb-4 flex items-center">
        4
        <span className="text-[#c5f82a]">
          <svg
            ref={circleRef}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-32 h-32"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        </span>
        4
      </h1>
      <p className="text-2xl mb-1">SORRY, THERE'S</p>
      <p className="text-4xl font-bold text-[#c5f82a] mb-8">NOTHING HERE</p>
      <Link
        ref={linkRef}
        to="/"
        className="bg-[#c5f82a] text-black px-6 py-2 rounded-md font-semibold hover:bg-[#d6ff3a] transition-colors"
      >
        GO HOME
      </Link>
    </div>
  );
};

export default ErrorPage;
