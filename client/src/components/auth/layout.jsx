import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Outlet } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { slides } from "@/data/slides";
import gsap from "gsap";

const AuthLayout = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const autoPlay = setInterval(() => {
      if (emblaApi) {
        emblaApi.scrollNext();
      }
    }, 5000);
    return () => clearInterval(autoPlay);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  // GSAP animation effect
  useEffect(() => {
    const textElements = document.querySelectorAll(".animated-text");
    const avatarElements = document.querySelectorAll(".animated-avatar");

    gsap.fromTo(
      [...textElements, ...avatarElements],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
      }
    );
  }, [selectedIndex]);

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-gray-900 to-black w-1/2 px-12">
        <div className="embla w-full max-w-md" ref={emblaRef}>
          <div className="embla__container flex">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="embla__slide w-full flex-[0_0_100%] min-w-0 relative mr-4"
              >
                <div className="space-y-6 text-center text-primary-foreground h-full flex flex-col justify-between">
                  <div>
                    <div className="text-orange-500 text-2xl font-bold mb-4 animated-text">
                      LOGO
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight mb-2 animated-text">
                      {slide.title}
                    </h1>
                    <p className="text-sm text-gray-400 animated-text">
                      {slide.subtitle}
                    </p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-6 flex flex-col justify-between flex-grow mt-4">
                    <p className="text-sm italic mb-2 animated-text">
                      {slide.testimonial.text}
                    </p>
                    <div className="flex items-center justify-center">
                      <Avatar
                        className={`w-12 h-12 mr-3 ${slide.testimonial.avatar.color} animated-avatar`} // Add animated class
                      >
                        <AvatarImage
                          src={slide.testimonial.avatar.src}
                          alt={slide.testimonial.author}
                        />
                        <AvatarFallback className="text-black font-bold text-xl">
                          {slide.testimonial.avatar.fallback}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="font-semibold animated-text">
                          {slide.testimonial.author}
                        </p>
                        <p className="text-xs text-gray-400 animated-text">
                          {slide.testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="embla__dots mt-6 flex justify-center">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === selectedIndex ? "bg-white" : "bg-gray-600"
                }`}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
