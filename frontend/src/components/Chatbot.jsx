import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, User, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { getLocalChatbotReply, callLiveLlmApi } from '../services/chatbotEngine';

export function Chatbot({ isOpen, onClose, initialQuery }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: "👋 Hi there! I'm the **AI Portfolio Agent** for **John Matthew A. Marcelo**.\n\nAsk me about:\n• My **5 Pinnacle client projects** (CLDH-EI, TMS, Bernardo College, Philyra POS, ICCT SMS)\n• Technical stack (**Laravel MVC, Vue.js, React, MySQL**)\n• Systems administration, education, or how to get in touch!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Centralized Gemini API Key configuration
  const [llmApiKey, setLlmApiKey] = useState(() => (typeof window !== 'undefined' && window.PORTFOLIO_GEMINI_KEY) || (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || localStorage.getItem('portfolio_gemini_key') || '');

  const [suggestedChips, setSuggestedChips] = useState([
    "What did you build at Pinnacle?",
    "Explain Philyra POS architecture",
    "How does ICCT SMS handle concurrency?",
    "What is your core tech stack?",
    "How can I contact John Matthew?"
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    try {
      let replyText = '';
      let newChips = [];

      // 1. If Central Gemini key is present, invoke Gemini directly
      const activeGeminiKey = (typeof window !== 'undefined' && window.PORTFOLIO_GEMINI_KEY) || (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || llmApiKey;

      if (activeGeminiKey && activeGeminiKey.trim() !== '' && !activeGeminiKey.includes('YOUR_GEMINI')) {
        try {
          replyText = await callLiveLlmApi({
            provider: 'gemini',
            apiKey: activeGeminiKey.trim(),
            model: 'gemini-1.5-flash',
            messages: updatedMessages
          });
        } catch (llmErr) {
          console.warn("Direct Gemini call failed, trying backend or local resolver:", llmErr);
        }
      }

      // 2. Try Live Laravel/Mock API (which can also use the server's central Gemini key)
      if (!replyText) {
        try {
          const apiResult = await api.sendChatMessage(text);
          if (apiResult && apiResult.reply) {
            replyText = apiResult.reply;
          }
        } catch (apiErr) {
          // Fall back to local knowledge base
        }
      }

      // 3. Fallback to rich built-in local knowledge engine
      if (!replyText) {
        const localResult = getLocalChatbotReply(text);
        replyText = localResult.reply;
        newChips = localResult.chips || [];
      }

      const agentMessage = {
        id: Date.now() + 1,
        sender: 'agent',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, agentMessage]);
      if (newChips.length > 0) setSuggestedChips(newChips);
    } catch (err) {
      const fallback = getLocalChatbotReply(text);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'agent',
          text: fallback.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render markdown with links and bold text
  const renderFormattedText = (rawText) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <a
            key={match[2]}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-0.5"
          >
            {match[1]}
            <ExternalLink className="w-3 h-3 inline" />
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const formattedParts = parts.map((part, pIdx) => {
        if (typeof part === 'string') {
          const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
          return boldParts.map((bPart, bIdx) => {
            if (bPart.startsWith('**') && bPart.endsWith('**')) {
              return <strong key={bIdx} className="font-semibold text-white">{bPart.slice(2, -2)}</strong>;
            }
            return bPart;
          });
        }
        return part;
      });

      return (
        <p key={idx} className={line.startsWith('• ') || line.startsWith('- ') ? 'pl-2 my-0.5' : 'my-1'}>
          {formattedParts}
        </p>
      );
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={onClose}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-2xl shadow-blue-500/40 border border-blue-400/40 transition-all hover:scale-105 group glow-blue"
        title="Chat with AI Agent"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
        </span>
        <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-semibold tracking-wide">Ask John Matthew's AI</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[450px] h-[600px] max-h-[92vh] bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
      
      {/* Chat Window Header */}
      <div className="px-4 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              John Matthew's AI Agent
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                {llmApiKey ? 'Gemini AI' : 'Active'}
              </span>
            </h4>
            <p className="text-[10px] text-slate-400 font-mono">Pinnacle Projects & Full-Stack Context</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#0a0e17]/80 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[82%] rounded-2xl p-3 leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-none'
              }`}
            >
              {renderFormattedText(msg.text)}
              <div
                className={`text-[9px] mt-1 text-right font-mono ${
                  msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
            <Bot className="w-4 h-4 text-blue-400 animate-spin" />
            <span>AI Agent is generating response...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      {suggestedChips.length > 0 && (
        <div className="px-3 py-2 bg-slate-950/70 border-t border-slate-800/60 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
          {suggestedChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 transition-colors shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input Box */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Pinnacle projects, Laravel, Vue, CV..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isLoading}
          className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white shadow-md transition-colors"
          title="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
