
"use client";

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, Bot, User, Loader, MessageCircle, Paperclip } from 'lucide-react';
import { chat } from '@/ai/flows/chat-flow';
import type { HistoryItem } from '@/ai/types';
import { useToast } from '@/hooks/use-toast';
import { chatbotWelcomeMessage } from '@/chatbot/chatbot-welcome';
import { usePathname } from 'next/navigation';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
    'hi': 'हिन्दी', 'bn': 'বাংলা', 'pa': 'ਪੰਜਾਬੀ', 'ko': '한국어',
    'vi': 'Tiếng Việt', 'tr': 'Türkçe', 'pl': 'Polski', 'nl': 'Nederlands',
    'sv': 'Svenska', 'fi': 'Suomi', 'no': 'Norsk', 'da': 'Dansk',
    'el': 'Ελληνικά', 'he': 'עברית', 'id': 'Bahasa Indonesia', 'th': 'ภาษาไทย', 'cs': 'Čeština',
    'hu': 'Magyar', 'ro': 'Română', 'sk': 'Slovenčina', 'bg': 'Български'
};


function logClientTrace(functionName: string, data: any) {
    if (process.env.NEXT_PUBLIC_TRACE === 'ON') {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] uhurulog_${functionName}:`, data);
    }
}

const generateSessionId = () => Math.floor(100000 + Math.random() * 900000).toString();

const ChatWidgetContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE_OBJECT]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const [currentLanguage, setCurrentLanguage] = useState<string | null>(null);
  
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

  const toggleOpen = () => {
    logClientTrace('toggleOpen', { isOpen: !isOpen });
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 1) {
        setMessages([INITIAL_MESSAGE_OBJECT]);
        sessionLanguageRef.current = null;
        setCurrentLanguage(null);
    }
  }

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    if (isOpen) {
        logClientTrace('useEffect_scrollToBottom', { trigger: 'isOpen_or_messages' });
        setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages, isPending]);

  const handleSend = async (messageContent: string) => {
    const functionName = 'handleSend';
    const newUserMessage = messageContent.trim();
    if (newUserMessage === '' || isPending || !sessionIdRef.current) return;
    
    logClientTrace(functionName, { input_newUserMessage: newUserMessage, sessionId: sessionIdRef.current });

    const userMessageObject: Message = { id: `user-${Date.now()}`, role: 'user', content: newUserMessage };
    const newMessages = [...messages, userMessageObject];
    setMessages(newMessages);
    setInput('');
    
    startTransition(async () => {
      try {
        const history: HistoryItem[] = newMessages
          .slice(1, -1) // Exclude initial welcome message and the new user message
          .slice(-MAX_HISTORY_MESSAGES) // Limit history size
          .map(msg => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content,
          }));

        logClientTrace(functionName, { request_history: history, sessionId: sessionIdRef.current });
        
        const response = await chat({
            prompt: newUserMessage,
            history: history,
            sessionId: sessionIdRef.current!,
            languageCode: sessionLanguageRef.current || undefined,
        });

        if (response.languageCode) {
            sessionLanguageRef.current = response.languageCode;
            setCurrentLanguage(languageCodeMap[response.languageCode] || response.languageCode);
        }
        
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response.content,
        };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      } catch (error) {
        console.error('Chat API error:', error);
        const errorMessage = error instanceof Error ? error.message : "I'm having trouble connecting. Please try again later.";
        toast({
            variant: "destructive",
            title: "An Error Occurred",
            description: errorMessage,
        });
        const assistantMessage: Message = {
            id: `assistant-error-${Date.now()}`,
            role: 'assistant',
            content: errorMessage,
        };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
       <TooltipProvider>
      {isOpen && (
          <div
            className="w-80 h-[28rem] bg-card rounded-lg shadow-2xl flex flex-col border border-border"
          >
            <div className="flex justify-between items-center p-3 border-b border-border bg-card-foreground/5 dark:bg-card-foreground/10 rounded-t-lg">
              <h3 className="text-base font-semibold text-foreground">
                UhurU AI Chat {currentLanguage && `(${currentLanguage})`}
              </h3>
              <Button variant="ghost" size="icon" onClick={toggleOpen} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.role === 'user' ? 'justify-end' : ''
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="bg-primary text-primary-foreground rounded-full p-2">
                        <Bot className="h-5 w-5" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-lg p-3 text-sm ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                      <div className="bg-muted text-muted-foreground rounded-full p-2">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                ))}
                {isPending && (
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="bg-muted text-muted-foreground rounded-lg p-3">
                      <Loader className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="p-3 border-t border-border">
              <div className="relative flex items-center gap-1">
                <Input
                  type="text"
                  placeholder="Ask something..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isPending}
                  className="pr-20"
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={true} className="h-8 w-8">
                                <Paperclip className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Attach file (Coming Soon)</p></TooltipContent>
                    </Tooltip>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSend(input)}
                        disabled={isPending || input.trim() === ''}
                        className="h-8 w-8"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
              </div>
            </div>
          </div>
        )}

      {!isOpen && (
            <div>
                <Button
                onClick={toggleOpen}
                className="rounded-full h-16 w-16 shadow-lg flex items-center justify-center bg-primary hover:bg-primary/90"
                >
                <MessageCircle className="h-9 w-9 text-primary-foreground" />
                </Button>
            </div>
        )}
        </TooltipProvider>
    </div>
  );
}

export default function ChatWidget() {
  const pathname = usePathname();

  if (pathname === '/ai-chat') {
    return null;
  }
  
  return <ChatWidgetContent />;
}
