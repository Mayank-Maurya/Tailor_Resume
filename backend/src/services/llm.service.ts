
export interface CompletionResponse {
  choices: {
    text: string;
  }[];
}

export async function generateTailoredResume(
  jd: string,
  baseResume: any,
  roleContext: any,
  apiKey: string
): Promise<string> {
  const prompt = `
Context:
You are an expert resume writer.

Job Description:
${jd}

Base Resume:
${JSON.stringify(baseResume, null, 2)}

Role Context:
${JSON.stringify(roleContext, null, 2)}

Task:
Generate a tailored resume based on the job description and the base resume.
`;

  const response = await fetch('https://api.provider.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 2000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate resume: ${response.statusText}`);
  }

  const data = (await response.json()) as CompletionResponse;

  if (!data.choices || data.choices.length === 0 || !data.choices[0]?.text) {
     throw new Error('Invalid response format from LLM provider');
  }

  return data.choices[0].text.trim();
}
