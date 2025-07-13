import z from "zod";

export const onboardingInputSchema = z.object({
  industry: z.string().refine((val) => !!val, {
    message: "Please select an industry",
  }),
  subIndustry: z.string().nonempty("Please select a specialization"),
  bio: z.string().max(500).optional(),
  experience: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .min(0, "Experience cannot be less than 0 years")
        .max(50, "Experience cannot be more than 50 years")
    ),
  skills: z.string().transform((val) =>
    val
      ? val
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : undefined
  ),
});
