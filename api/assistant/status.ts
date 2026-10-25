import type { IncomingMessage, ServerResponse } from 'http';

export default function handler(
  _req: IncomingMessage,
  res: ServerResponse & { json?: (data: unknown) => void; status?: (code: number) => ServerResponse }
) {
  const apiKey = process.env.GEMINI_API_KEY;
  const configured = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 0);

  const payload = JSON.stringify({
    configured,
    model: 'gemini-3.8-flash',
    status: configured ? 'ai_ready' : 'knowledge_base_mode',
  });

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(payload);
}
