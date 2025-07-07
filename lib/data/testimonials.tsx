export type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "David Chen",
    role: "Software Engineer, Bangalore",
    avatar: "https://i.pravatar.cc/150?img=3",
    quote:
      "KairoHire.ai helped me turn my scattered projects into a focused, job-ready resume. I landed two interviews within a week.",
  },
  {
    name: "Ananya Patel",
    role: "Product Manager, San Francisco",
    avatar: "https://i.pravatar.cc/150?img=5",
    quote:
      "The mock interviews felt eerily real — they helped me fix blind spots I didn't even know I had. I felt 10x more confident.",
  },
  {
    name: "Fatim Ali",
    role: "UX Designer, London",
    avatar: "https://i.pravatar.cc/150?img=12",
    quote:
      "I’ve used a dozen AI tools, but KairoHire is the first that actually feels like a coach — not just a chatbot.",
  },
  {
    name: "Dhruv Mehta",
    role: "Recent Graduate, Delhi",
    avatar: "https://i.pravatar.cc/150?img=8",
    quote:
      "As someone just starting out, KairoHire gave me clarity. It showed me what roles to aim for and how to get there — step by step.",
  },
];
