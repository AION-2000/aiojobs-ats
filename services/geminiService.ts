
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData } from "../types";

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  private getClient() {
    // Initialize lazily to ensure it picks up the latest environment variables
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API Key is missing. Please check your Vercel Environment Variables.");
    }
    return new GoogleGenAI({ apiKey });
  }

  async parseResume(resumeText: string): Promise<ResumeData> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Extract the following details from this resume text into a structured JSON format:
      Name, Email, Phone, Skills, Experience (title, company, duration), and Education (degree, institution, year).
      
      Resume Text:
      ${resumeText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            email: { type: Type.STRING },
            phone: { type: Type.STRING },
            skills: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            experience: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  company: { type: Type.STRING },
                  duration: { type: Type.STRING }
                },
                required: ['title', 'company', 'duration']
              }
            },
            education: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  degree: { type: Type.STRING },
                  institution: { type: Type.STRING },
                  year: { type: Type.STRING }
                },
                required: ['degree', 'institution', 'year']
              }
            }
          },
          required: ['name', 'email', 'skills', 'experience', 'education']
        }
      }
    });

    try {
      const result = JSON.parse(response.text || '{}');
      return result as ResumeData;
    } catch (e) {
      console.error("Failed to parse Gemini response as JSON", e);
      throw new Error("Could not parse resume data");
    }
  }
}

export const geminiService = new GeminiService();
