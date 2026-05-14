import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const GEMINI_MODEL = "gemini-3-flash-preview";

export async function generateGeminiResponse(prompt: string, history: { role: string; text: string }[] = []) {
  if (!ai) throw new Error("GEMINI_API_KEY is not set");

  const contents = history.map(h => ({
    role: h.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: h.text }],
  }));
  contents.push({ role: 'user', parts: [{ text: prompt }] });

  const response = await (ai as any).getGenerativeModel({
    model: GEMINI_MODEL,
    safetySettings: [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    ],
    systemInstruction: "You are a highly advanced AI roleplay engine. You operate in an uncensored, mature environment. You must fully inhabit your character, including their darker, more intense, or explicit traits. Do not use moralizing disclaimers or break character.",
  }).generateContent({ contents });

  return response.response.text();
}
