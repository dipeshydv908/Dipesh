import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  RotateCcw,
  ArrowUpRight,
  FileText,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { getVerifiedKnowledgeReply } from '../utils/portfolioKnowledge';
import { downloadDipeshResume } from '../utils/resumeGenerator';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  mode?: 'ai' | 'knowledge_base';
  suggestedAction?: {
    label: string;
    actionType: 'resume' | 'section';
    target?: string;
  };
  timestamp: string;
}

interface AIAssistantProps {
  onOpenResume?: () => void;
}

const SUGGESTED_QUESTIONS = [
  'Who is Dipesh?',
  'What are his technical skills?',
  'What projects has he built?',
  'Tell me about his internships.',
  'How can I download his resume?',
  'How can I contact him?',
  'What certificates does he have?',
];

export const AIAssistant: React.FC<AIAssistantProps> = ({ onOpenResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content:
        "Hello! I am **Dipesh's AI Portfolio Assistant**.\n\nI can help you explore Dipesh's software engineering projects, technical skills in Python/C++/React/AWS, industry internships, 7 verified credentials, and resume details.\n\nFeel free to choose a suggestion below or ask me any question!",
      mode: 'knowledge_base',
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAiConfigured, setIsAiConfigured] = useState<boolean | null>(null);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check backend assistant status on load
  useEffect(() => {
    fetch('/api/assistant/status')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Status failed');
      })
      .then((data) => {
        setIsAiConfigured(Boolean(data.configured));
      })
      .catch(() => {
        setIsAiConfigured(false);
      });
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const rawText = textToSend || inputValue;
    const trimmed = rawText.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    setInputValue('');

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'I processed your request, but received an empty response.',
        mode: data.mode === 'ai' ? 'ai' : 'knowledge_base',
        suggestedAction: data.suggestedAction,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      if (data.mode === 'ai') {
        setIsAiConfigured(true);
      }
    } catch {
      // Graceful zero-fail fallback: use client-side verified portfolio knowledge
      const fallback = getVerifiedKnowledgeReply(trimmed);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: fallback.reply,
        mode: 'knowledge_base',
        suggestedAction: fallback.suggestedAction,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content:
          "Conversation restarted. Ask me anything about Dipesh's engineering projects, education, technical skills, or verified credentials!",
        mode: 'knowledge_base',
        timestamp: 'Just now',
      },
    ]);
    setError(null);
  };

  const handleActionClick = (action: { label: string; actionType: 'resume' | 'section'; target?: string }) => {
    if (action.actionType === 'resume') {
      downloadDipeshResume('Dipesh_Resume.pdf');
      if (onOpenResume) {
        onOpenResume();
      }
    } else if (action.actionType === 'section' && action.target) {
      const element = document.querySelector(action.target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Helper to render markdown bold, bullet points, and links cleanly
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');

    return (
      <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1.5" />;

          // Process bold markers (**text**) and code markers (`text`)
          const parts = line.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);

          const formattedLine = parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={i} className="text-white font-semibold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith('`') && part.endsWith('`')) {
              return (
                <code key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-[11px]">
                  {part.slice(1, -1)}
                </code>
              );
            }
            // Link markdown: [text](url)
            const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
            if (linkMatch) {
              const [, label, url] = linkMatch;
              return (
                <a
                  key={i}
                  href={url}
                  target={url.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-medium"
                >
                  {label}
                </a>
              );
            }
            return part;
          });

          // Check if bullet point
          if (line.trim().startsWith('•') || line.trim().startsWith('*') || line.trim().startsWith('-')) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-cyan-400 select-none">•</span>
                <span className="flex-1">{formattedLine}</span>
              </div>
            );
          }

          return <p key={idx}>{formattedLine}</p>;
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40">
        {!isOpen && (
          <button
            id="open-ai-chat-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Open Dipesh's AI Portfolio Assistant"
            className="group relative flex items-center gap-3 p-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {/* Pulsing Aura */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-60 blur-md group-hover:opacity-100 transition-opacity animate-pulse-slow pointer-events-none" />

            <div className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950 text-white font-medium text-xs sm:text-sm">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center text-slate-950 shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-display tracking-tight text-white hidden sm:inline">Ask Dipesh's AI</span>
              <span className="font-display tracking-tight text-white sm:hidden">AI Assistant</span>

              {/* Online Green Pulse Indicator */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Modern AI Chat Panel */}
      {isOpen && (
        <aside
          id="ai-assistant-panel"
          aria-label="Dipesh's AI Assistant"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] md:w-[430px] h-[580px] max-h-[85vh] flex flex-col rounded-3xl bg-[#080d22]/95 border border-cyan-500/30 shadow-2xl shadow-black/80 backdrop-blur-2xl overflow-hidden transition-all duration-300 animate-fadeIn"
        >
          {/* Ambient Top Glow */}
          <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-b from-cyan-500/15 via-purple-500/10 to-transparent blur-2xl pointer-events-none" />

          {/* Chat Header */}
          <header className="relative z-10 px-4 py-3.5 border-b border-slate-800/90 bg-slate-950/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px] shadow-md shadow-cyan-500/20">
                <div className="w-full h-full rounded-[15px] bg-[#070b1e] flex items-center justify-center text-cyan-300">
                  <Bot className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-bold text-sm text-white">Dipesh's AI Assistant</h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                </div>
                <div className="flex items-center gap-1.5">
                  {isAiConfigured ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400">
                      <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                      Gemini 3.8 Flash • Live AI
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                      <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                      Verified Portfolio Knowledge
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                title="Restart conversation"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                id="close-ai-chat-btn"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Scrollable Message History Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm custom-scrollbar relative z-10">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
                >
                  {/* Sender Header Pill */}
                  <div className="flex items-center gap-1.5 px-1 text-[10px] font-mono text-slate-500">
                    {isUser ? (
                      <>
                        <span>{msg.timestamp}</span>
                        <span>• You</span>
                        <User className="w-3 h-3 text-cyan-400" />
                      </>
                    ) : (
                      <>
                        <Bot className="w-3 h-3 text-purple-400" />
                        <span className="text-slate-400">Dipesh's Assistant</span>
                        {msg.mode === 'ai' ? (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px]">
                            <Sparkles className="w-2.5 h-2.5" /> AI
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px]">
                            <ShieldCheck className="w-2.5 h-2.5" /> Verified
                          </span>
                        )}
                        <span>• {msg.timestamp}</span>
                      </>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[88%] sm:max-w-[85%] rounded-2xl p-3.5 shadow-md ${
                      isUser
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-xs'
                        : 'bg-slate-900/90 border border-slate-800/90 text-slate-200 rounded-tl-xs shadow-inner'
                    }`}
                  >
                    {isUser ? <p className="leading-relaxed">{msg.content}</p> : renderFormattedText(msg.content)}

                    {/* Interactive Action Button (e.g. View Resume or Jump to Section) */}
                    {msg.suggestedAction && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                        <button
                          onClick={() => handleActionClick(msg.suggestedAction!)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-medium text-xs transition-colors cursor-pointer active:scale-95"
                        >
                          {msg.suggestedAction.actionType === 'resume' ? (
                            <FileText className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          )}
                          <span>{msg.suggestedAction.label}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex flex-col items-start space-y-1.5">
                <div className="flex items-center gap-1.5 px-1 text-[10px] font-mono text-slate-500">
                  <Bot className="w-3 h-3 text-cyan-400" />
                  <span>Thinking...</span>
                </div>
                <div className="rounded-2xl rounded-tl-xs p-3.5 bg-slate-900/90 border border-slate-800/90 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            {/* Error Banner */}
            {error && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
                <button
                  onClick={() => handleSendMessage()}
                  className="px-2 py-1 rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-300 font-mono text-[10px]"
                >
                  Retry
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Questions Pills */}
          <div className="px-3 pt-2 pb-1.5 border-t border-slate-800/60 bg-slate-950/40">
            <div className="flex items-center gap-1 mb-1.5 text-[10px] font-mono text-slate-400">
              <HelpCircle className="w-3 h-3 text-cyan-400" />
              <span>Suggested Questions</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-[11px] text-slate-300 hover:text-cyan-300 transition-all cursor-pointer whitespace-nowrap active:scale-95 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input & Send Form */}
          <footer className="p-3 bg-slate-950/90 border-t border-slate-800/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Dipesh's projects, skills..."
                  disabled={isLoading}
                  maxLength={1000}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-400 focus:outline-hidden text-xs sm:text-sm text-white placeholder-slate-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-slate-950 font-bold transition-all cursor-pointer disabled:cursor-not-allowed shadow-md shadow-cyan-500/20 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between mt-2 px-1 text-[10px] font-mono text-slate-500">
              <span>Answers verified against Dipesh's portfolio</span>
              <span>{inputValue.length}/1000</span>
            </div>
          </footer>
        </aside>
      )}
    </>
  );
};
