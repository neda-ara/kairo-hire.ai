"use client";

import { Button } from "../ui/button";
import { ROUTES } from "@/lib/helpers/constants";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement?.classList.add("scrolled");
      } else {
        imageElement?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-ful pt-36 md:pt-48 pb-10 px-4 sm:px-0">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="gradient-title text-4xl font-bold md:text-5xl lg:text-6xl xl:text-7xl">
            Your AI Career Companion <br /> Where Algorithms Meet Ambition
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Smarter tools. Sharper moves. Designed to help you act when the
            moment’s right — that’s the Kairo way.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href={ROUTES.DASHBOARD}>
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" className="px-8" variant="outline">
              View Demo
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/assets/banner.png"
              width={1280}
              height={720}
              alt="Banner"
              className="max-w-full rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
