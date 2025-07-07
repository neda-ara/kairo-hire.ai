"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Testimonial, testimonials } from "@/lib/data/testimonials";

export const Testimonials = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 px-4 sm:px-0">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial: Testimonial, idx: number) => {
            return (
              <Card
                key={idx}
                className="border-2 hover:border-primary transition-colors duration-300 bg-background shadow-sm"
              >
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Image
                    src={testimonial?.avatar}
                    alt={`${testimonial?.name}'s avatar`}
                    width={60}
                    height={60}
                    className="rounded-full object-cover border-2 border-primary/20"
                  />
                  <p className="text-sm text-muted-foreground italic">
                    “{testimonial?.quote}”
                  </p>
                  <div className="mt-4">
                    <p className="font-medium text-foreground">
                      {testimonial?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial?.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
