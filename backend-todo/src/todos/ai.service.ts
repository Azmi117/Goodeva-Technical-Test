import { Injectable } from '@nestjs/common';
import OpenAI from 'openai'; //

@Injectable()
export class AiService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, //
  });

  async getRecommendation(title: string, problem: string) {
    try {
      const prompt = `Tugas: "${title}". Kendala: "${problem}". Berikan 1 saran solusi singkat dalam Bahasa Indonesia.`;
      
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
      });

      return response.choices[0].message.content; //
    } catch (error) {
      console.error('OpenAI Error:', error);
      return 'Gagal mengambil saran AI. Coba cek API Key.';
    }
  }
}