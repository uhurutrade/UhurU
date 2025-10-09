
"use client";

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Loader, Send, Download, PlusSquare, Globe } from 'lucide-react';
// import { chat } from '@/ai/flows/chat-flow'; // No longer exists
import type { HistoryItem } from '@/ai/types';
import { useToast } from '@/hooks/use-toast';
import { chatbotWelcomeMessage } from '@/chatbot/chatbot-welcome';
import { Card, CardContent } from '../ui/card';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const MAX_HISTORY_MESSAGES = 50;
const INITIAL_MESSAGE_OBJECT: Message = { 
  id: 'initial', 
  role: 'assistant', 
  content: chatbotWelcomeMessage 
};

const languageCodeMap: { [key: string]: string } = {
    'en': 'English', 'es': 'Español', 'fr': 'Français', 'de': 'Deutsch', 'it': 'Italiano',
    'pt': 'Português', 'ru': 'Русский', 'zh': '中文', 'ja': '日本語', 'ar': 'العربية',
    'hi': 'हिन्दी', 'bn': 'বাংলা', 'pa': 'ਪੰਜਾਬੀ', 'jv': 'Javanese', 'ko': '한국어',
    'vi': 'Tiếng Việt', 'te': 'Telugu', 'mr': 'Marathi', 'tr': 'Türkçe', 'ta': 'Tamil',
    'ur': 'Urdu', 'gu': 'Gujarati', 'pl': 'Polski', 'uk': 'Українська', 'nl': 'Nederlands',
    'ms': 'Bahasa Melayu', 'sv': 'Svenska', 'fi': 'Suomi', 'no': 'Norsk', 'da': 'Dansk',
    'el': 'Ελληνικά', 'he': 'עברית', 'id': 'Bahasa Indonesia', 'th': 'ภาษาไทย', 'cs': 'Čeština',
    'hu': 'Magyar', 'ro': 'Română', 'sk': 'Slovenčina', 'bg': 'Български'
};

const respondingInMap: { [key: string]: string } = { 
    'en': 'Responding in', 'es': 'Respondiendo en', 'fr': 'Répondre en', 'de': 'Antworten auf', 'it': 'Rispondendo in',
    'pt': 'Respondendo em', 'ru': 'Отвечаю на', 'zh': '以...回复', 'ja': 'で応答', 'ar': 'الرد ب',
    'pl': 'Odpowiadanie w', 'nl': 'Antwoorden in', 'sv': 'Svarar på', 'tr': 'Yanıt veriliyor'
};


function logClientTrace(functionName: string, data: any) {
    if (process.env.NEXT_PUBLIC_TRACE === 'ON') {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] uhurulog_${functionName}:`, data);
    }
}

const generateSessionId = () => Math.floor(100000 + Math.random() * 900000).toString();

export default function FullScreenChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE_OBJECT]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const [sessionLanguageCode, setSessionLanguageCode] = useState<string | null>(null);
  
  const sessionIdRef = useRef<string | null>(null);
  const sessionLanguageRef = useRef<string | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const { toast } = useToast();
  
  useEffect(() => {
    if (!sessionIdRef.current) {
        sessionIdRef.current = generateSessionId();
        logClientTrace('initSession', { sessionId: sessionIdRef.current });
    }
  }, []);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, [messages, isPending]);

  const handleSend = async (messageContent: string) => {
    const functionName = 'handleSend';
    const newUserMessage = messageContent.trim();
    if (newUserMessage === '' || isPending || !sessionIdRef.current) return;
    
    const userMessageObject: Message = { id: `user-${Date.now()}`, role: 'user', content: newUserMessage };

    setMessages((prev) => [...prev, userMessageObject]);
    setInput('');
    
    startTransition(async () => {
      const errorMessage = "The chat functionality is temporarily disabled. Please contact us via email for any inquiries.";
      const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: errorMessage,
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      toast({
        variant: "destructive",
        title: "Chat Unavailable",
        description: "The chat functionality is temporarily disabled.",
      });
    });
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  const handleDownload = () => {
    const conversationText = messages.map(msg => `${msg.role.charAt(0).toUpperCase() + msg.role.slice(1)}:\n${msg.content}`).join('\n\n---\n\n');
    const blob = new Blob([conversationText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `uhuru-chat-${new Date().toISOString().replace(/:/g, '-')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: "Conversation Downloaded" });
  };

  const handleNewChat = () => {
    setMessages([INITIAL_MESSAGE_OBJECT]);
    sessionIdRef.current = generateSessionId();
    sessionLanguageRef.current = null;
    setSessionLanguageCode(null);
    toast({ title: "New Chat Started" });
  };

  const getDynamicTitle = () => {
      if (sessionLanguageCode && languageCodeMap[sessionLanguageCode] && respondingInMap[sessionLanguageCode]) {
          const respondingIn = respondingInMap[sessionLanguageCode];
          const languageName = languageCodeMap[sessionLanguageCode];
          return `${respondingIn} ${languageName}`;
      }
      return "All language - Polyglot";
  }
  
  return (
    <TooltipProvider>
      <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto p-4 min-h-0">
          <div className="flex items-center justify-between pb-4 border-b mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-5 w-5" />
                  <span>
                    UhurU AI | {getDynamicTitle()}
                  </span>
              </div>
              <div className="flex items-center gap-2">
                  <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" onClick={handleDownload} disabled={messages.length <= 1}><Download className="h-5 w-5" /></Button></TooltipTrigger><TooltipContent><p>Download conversation</p></TooltipContent></Tooltip>
                  <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" onClick={handleNewChat}><PlusSquare className="h-5 w-5" /></Button></TooltipTrigger><TooltipContent><p>New chat</p></TooltipContent></Tooltip>
              </div>
          </div>
          <ScrollArea className="flex-1 pr-4 -mr-4" ref={scrollAreaRef}>
              <div className="space-y-6 pb-4">
              {messages.map((message) => (
                  <div key={message.id} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                      {message.role === 'assistant' && (<div className="bg-primary text-primary-foreground rounded-full p-2.5 flex-shrink-0"><Bot className="h-6 w-6" /></div>)}
                      <div className={`max-w-[80%] rounded-xl p-4 text-base shadow-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {message.role === 'user' && (<div className="bg-muted text-muted-foreground rounded-full p-2.5 flex-shrink-0"><User className="h-6 w-6" /></div>)}
                  </div>
              ))}
              {isPending && (
                  <div className="flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground rounded-full p-2.5"><Bot className="h-6 w-6" /></div>
                      <div className="bg-muted text-muted-foreground rounded-xl p-4"><Loader className="h-6 w-6 animate-spin" /></div>
                  </div>
              )}
              </div>
          </ScrollArea>
          <div className="pt-4 mt-auto">
              <Card className="relative shadow-lg">
                  <CardContent className="p-2">
                      <div className="relative flex items-center gap-2">
                          <Input type="text" placeholder="Ask something..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} disabled={isPending} className="text-base h-12 pr-12 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"/>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                              <Button variant="ghost" size="icon" onClick={() => handleSend(input)} disabled={isPending || input.trim() === ''} className="h-9 w-9"><Send className="h-5 w-5" /></Button>
                          </div>
                      </div>
                  </CardContent>
              </Card>
          </div>
      </div>
    </TooltipProvider>
  );
}
