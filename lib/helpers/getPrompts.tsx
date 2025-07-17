export const getIndustryInsightPrompt = (industry: string) => `
You are an expert industry analyst. Analyze the **current global and regional state** of the **${industry}** industry
and respond strictly in the following JSON format with **no explanations or extra content**.

Return only valid JSON that conforms exactly to this structure:

{
  "salaryRanges": [
    { "role": "string", "min": number, "max": number, "median": number, "location": "string" },
    ...
  ],
  "growthRate": number, 
  "demandLevel": "HIGH" | "MEDIUM" | "LOW",
  "topSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
  "keyTrends": ["trend1", "trend2", "trend3", "trend4", "trend5"],
  "recommendedSkills": ["skill1", "skill2", "skill3", "skill4", "skill5", "skill6", "skill7", "skill8", "skill9", "skill10"]
}

⚠️ IMPORTANT RULES:
- **Return only the JSON** above — no markdown, headings, or commentary.
- Include **at least 5 salary roles** with global location-specific data.
- Use realistic and recent data where possible.
- growthRate should be in **percentage (0-100)**, not a decimal.

The output should be ready for direct parsing as JSON.
`;

export const getInterviewQuestionsPrompt = (
  industry: string,
  skills?: string[]
) => `
You are an experienced professional and interviewer knowledgeable in the ${industry} industry${
  skills?.length ? `, with expertise in ${skills.join(", ")}` : ""
}.

Create exactly 10 multiple-choice interview questions that closely follow the style, format, and level of difficulty of actual interview questions previously asked in this field${
  skills?.length ? `, especially focusing on ${skills.join(", ")}` : ""
}.

These questions should reflect real-world interviewing patterns, including common traps, tricky wording, and scenarios interviewers typically use to assess candidates’ depth of knowledge.

Each question should be clear, challenging yet fair, and represent current industry standards, trends, and best practices.

For each question, provide:
- "question": a precise, relevant question
- "options": an array of 4 plausible answer choices
- "correctAnswer": the exact string from the options that is correct
- "explanation": a concise, informative explanation of why the correct answer is right

Return strictly valid, parsable JSON with no additional commentary or formatting:

{
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": "string",
      "explanation": "string"
    }
  ]
}
`;

export const getImprovementTipPrompt = (
  industry: string,
  wrongQuestionsContext: string
) =>
  `The user answered the following ${industry} technical interview questions incorrectly:

${wrongQuestionsContext}

Based on this, provide one clear and encouraging improvement tip focused on the knowledge areas the user should strengthen.
Avoid referencing the questions or mistakes directly. Instead, highlight what concepts or skills to focus on.
Limit the response to 1-2 concise sentences. No extra preamble or commentary apart from improvement tip is required.`;
