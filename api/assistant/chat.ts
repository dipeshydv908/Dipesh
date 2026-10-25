import type { IncomingMessage, ServerResponse } from 'http';
import { GoogleGenAI } from '@google/genai';
import { PORTFOLIO_FACTS_TEXT, getVerifiedKnowledgeReply } from '../../src/utils/portfolioKnowledge';

interface VercelRequest extends IncomingMessage {
  body?: {
    message?: string;
    history?: Array<{ role: 'user' | 'assistant'; content: string }>;
  };
}

interface VercelResponse extends ServerResponse {
  json?: (data: unknown) => void;
  status?: (code: number) => VercelResponse;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  // Parse body if not already parsed
  let body = req.body;
  if (!body) {
    try {
      const buffers: Buffer[] = [];
      for await (const chunk of req) {
        buffers.push(chunk as Buffer);
      }
      const raw = Buffer.concat(buffers).toString();
      body = raw ? JSON.parse(raw) : {};
    } catch {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Invalid JSON request body.' }));
      return;
    }
  }

  const { message, history } = body || {};

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Message cannot be empty.' }));
    return;
  }

  if (message.length > 1000) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Message exceeds maximum length of 1000 characters.' }));
    return;
  }

  const trimmedMessage = message.trim();
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 0) {
    try {
      const aiClient = new GoogleGenAI({
        apiKey: apiKey.trim(),
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item && item.content && typeof item.content === 'string') {
            contents.push({
              role: item.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: item.content.slice(0, 1000) }],
            });
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: trimmedMessage }],
      });

      const systemInstruction = `${PORTFOLIO_FACTS_TEXT}

ROLE & BEHAVIORAL CONSTRAINTS:
1. You are "Dipesh's AI Assistant" for Dipesh's developer portfolio website.
2. Rely EXCLUSIVELY on the verified facts above. Never invent companies, work experience, phone numbers, GPAs, or unverified claims.
3. If asked about something outside these facts, clearly state that the information is not documented in Dipesh's verified portfolio and politely direct them to check his projects/certificates or email dipeshydv908@gmail.com.
4. Keep replies friendly, concise, and structured with markdown bullet points where appropriate.
5. Provide helpful next steps and reference portfolio sections (e.g. #projects, #skills, #experience, #certificates, #contact, or his Resume).`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.2,
        },
      });

      const reply = response.text || 'I apologize, but I could not formulate a response at this time.';
      const localMatch = getVerifiedKnowledgeReply(trimmedMessage);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          reply,
          mode: 'ai',
          model: 'gemini-3.8-flash',
          suggestedAction: localMatch.suggestedAction,
        })
      );
      return;
    } catch (err: unknown) {
      console.error('Gemini API call failed on Vercel, falling back to verified knowledge base:', err);
    }
  }

  // Fallback: verified knowledge engine
  const fallback = getVerifiedKnowledgeReply(trimmedMessage);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      reply: fallback.reply,
      mode: 'knowledge_base',
      suggestedAction: fallback.suggestedAction,
      note: 'Answered via Dipesh\'s verified portfolio knowledge engine.',
    })
  );
}
