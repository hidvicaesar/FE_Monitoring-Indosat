import { GoogleGenerativeAI } from "@google/generative-ai";

// Mengambil API Key dari environment variable
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Gunakan gemini-1.5-flash untuk performa cepat dan hemat memori
export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
