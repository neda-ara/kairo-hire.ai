import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "karo-hire.ai",
  name: "KairoHire.ai",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
