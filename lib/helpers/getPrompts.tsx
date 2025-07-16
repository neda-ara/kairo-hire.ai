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
