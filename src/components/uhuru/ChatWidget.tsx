
"use client";

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, X, Send, Bot, User, Loader } from 'lucide-react';
import { chat } from '@/ai/flows/chat-flow';
import type { HistoryItem } from '@/ai/types';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_HISTORY_MESSAGES = 10;
const INITIAL_MESSAGE = "¡Hola! Soy el asistente de IA de UhurU. Pregúntame sobre nuestros servicios, el mercado Forex, opciones de inversión o cómo podemos ayudarte a crecer. ¿En qué te puedo ayudar hoy?";

function logClientTrace(functionName: string, data: any) {
    if (process.env.NEXT_PUBLIC_TRACE === 'ON') {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] uhurulog_${functionName}:`, data);
    }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: INITIAL_MESSAGE,
    },
  ]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const toggleOpen = () => {
    logClientTrace('toggleOpen', { isOpen: !isOpen });
    setIsOpen(!isOpen);
  }

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div');
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

  const handleSend = async () => {
    const functionName = 'handleSend';
    const newUserMessage = input.trim();
    if (newUserMessage === '' || isPending) return;
    
    logClientTrace(functionName, { input_newUserMessage: newUserMessage });

    const userMessageObject: Message = { role: 'user', content: newUserMessage };
    setMessages((prevMessages) => [...prevMessages, userMessageObject]);
    setInput('');
    
    startTransition(async () => {
      logClientTrace(functionName, { status: 'transition_started' });
      try {
        const historyForAI: HistoryItem[] = messages
          .filter(msg => msg.content !== INITIAL_MESSAGE)
          .slice(-MAX_HISTORY_MESSAGES); 
        
        logClientTrace(functionName, { calling_chat_flow_with_history: historyForAI });
        const aiResponse = await chat(newUserMessage, historyForAI);
        logClientTrace(functionName, { received_aiResponse: aiResponse });

        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: aiResponse },
        ]);

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        logClientTrace(functionName, { error_in_transition: errorMessage });
        
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'assistant', content: `Error: ${errorMessage}` },
        ]);

        toast({
          variant: "destructive",
          title: "Chat Error",
          description: "Sorry, I'm having trouble connecting. Please try again later.",
        });
      }
      logClientTrace(functionName, { status: 'transition_finished' });
    });
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
          <div
            className="w-80 h-[28rem] bg-card rounded-lg shadow-2xl flex flex-col border border-border"
          >
            <div className="flex justify-between items-center p-3 border-b border-border bg-card-foreground/5 dark:bg-card-foreground/10 rounded-t-lg">
              <h3 className="text-base font-semibold text-foreground">UhurU AI Chat</h3>
              <Button variant="ghost" size="icon" onClick={toggleOpen} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
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
                      className={`max-w-[75%] rounded-lg p-3 text-sm ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {message.content}
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
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Ask something..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isPending}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSend}
                  disabled={isPending}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                >
                  <Send className="h-4 w-4" />
                </Button>
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
                <MessageSquare className="h-8 w-8 text-primary-foreground" />
                </Button>
            </div>
        )}
    </div>
  );
}
