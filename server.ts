import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { PORTFOLIO_FACTS_TEXT, getVerifiedKnowledgeReply } from './src/utils/portfolioKnowledge.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Initialize GoogleGenAI SDK with telemetry header per guidelines
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 0) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey.trim(),
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Simple in-memory rate limiting map for abuse protection
const requestLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

async function startServer() {
  const app = express();

  // Middleware with size limits for abuse protection
  app.use(express.json({ limit: '100kb' }));

  // Status endpoint: indicates whether server-side Gemini AI is active
  app.get('/api/assistant/status', (_req: Request, res: Response) => {
    res.json({
      configured: Boolean(aiClient),
      model: 'gemini-3.8-flash',
      status: aiClient ? 'ai_ready' : 'knowledge_base_mode',
    });
  });

  // Chat endpoint
  app.post('/api/assistant/chat', async (req: Request, res: Response) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        error: 'Too many requests. Please pause a moment before asking another question.',
        mode: 'error',
      });
    }

    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    if (message.length > 1000) {
      return res.status(400).json({ error: 'Message exceeds maximum length of 1000 characters.' });
    }

    const trimmedMessage = message.trim();

    // 1. If Gemini AI is configured, attempt generative response
    if (aiClient) {
      try {
        const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

        // Append recent conversational context
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

        // Add current user prompt
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

        // Detect if the query matches a specific portfolio section or resume action
        const localMatch = getVerifiedKnowledgeReply(trimmedMessage);

        return res.json({
          reply,
          mode: 'ai',
          model: 'gemini-3.8-flash',
          suggestedAction: localMatch.suggestedAction,
        });
      } catch (err: unknown) {
        console.error('Gemini API call failed, falling back to verified knowledge base:', err);
        // Fallback gracefully without breaking the user experience
        const fallback = getVerifiedKnowledgeReply(trimmedMessage);
        return res.json({
          reply: fallback.reply,
          mode: 'knowledge_base',
          suggestedAction: fallback.suggestedAction,
          note: 'AI model service was temporarily unreachable; served response from Dipesh\'s verified knowledge base.',
        });
      }
    }

    // 2. If Gemini AI is not configured, respond with verified portfolio knowledge
    const fallback = getVerifiedKnowledgeReply(trimmedMessage);
    return res.json({
      reply: fallback.reply,
      mode: 'knowledge_base',
      suggestedAction: fallback.suggestedAction,
      note: 'Answered via Dipesh\'s verified portfolio knowledge engine.',
    });
  });

  // Direct PDF resume download route ensuring correct application/pdf and attachment headers
  app.get('/Dipesh_Resume.pdf', (_req: Request, res: Response) => {
    const resumePath = path.resolve(__dirname, 'public', 'Dipesh_Resume.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Dipesh_Resume.pdf"');
    res.sendFile(resumePath);
  });

  // Mount Vite middleware in development or static files in production
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT} in ${isProduction ? 'production' : 'development'} mode`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
