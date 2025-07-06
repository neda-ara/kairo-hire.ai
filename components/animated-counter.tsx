"use client";

import { formatNumber } from "@/lib/helpers/formatNumber";
import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  target: number;
  duration?: number; //in ms
};

export const AnimatedCounter = ({
  target,
  duration = 2_000,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let start: number | null = null;

          const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const current = Math.floor(progress * target);
            setDisplay(`${formatNumber(current)}+`);

            if (progress < 1) requestAnimationFrame(animate);
            else setDisplay(`${formatNumber(target)}+`);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{display}</span>;
};
