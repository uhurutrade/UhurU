
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, X, Send, Bot, User, Loader } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm UhurU's AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    // Placeholder for backend call
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: "I'm not connected right now, but I'm ready to chat!" },
      ]);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-80 h-[28rem] bg-card rounded-lg shadow-2xl flex flex-col border border-border"
          >
            <div className="flex justify-between items-center p-3 border-b border-border bg-card-foreground/5 dark:bg-card-foreground/10 rounded-t-lg">
              <h3 className="text-base font-semibold text-foreground">Chat with UhurU AI</h3>
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
                {isLoading && (
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
                  disabled={isLoading}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
            >
                <Button
                onClick={toggleOpen}
                className="rounded-full h-16 w-16 shadow-lg flex items-center justify-center"
                >
                <MessageSquare className="h-8 w-8" />
                </Button>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
