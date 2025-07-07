"use client";

import { FAQ, faqs } from "@/lib/data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export const FrequentlyAskedQuestions = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background px-4 sm:px-0">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Still Curious? Let’s Clear Things Up.
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item: FAQ, idx: number) => {
              return (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger className="lg:text-lg hover:underline-0">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="lg:text-base text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
