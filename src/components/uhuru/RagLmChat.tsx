"use client";

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Loader, Send, Plus, MessageSquare, Trash2, GraduationCap, Download } from 'lucide-react';
import { ragLmChat } from '@/ai/flows/rag-lm-chat-flow'; // Use the new flow
import type { HistoryItem } from '@/ai/types';
import { useToast } from '@/hooks/use-toast';
import { Card } from '../ui/card';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import Logo from './logo';
import { ThemeToggle } from '../theme-toggle';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const MAX_HISTORY_MESSAGES = 50;

const generateSessionId = () => `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

export default function RagLmChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Record<string, Message[]>>({});

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!currentChatId) {
      handleNewChat();
    }
  }, []);

  useEffect(() => {
    if (currentChatId && chatHistory[currentChatId]) {
      setMessages(chatHistory[currentChatId]);
    } else {
      setMessages([]);
    }
  }, [currentChatId, chatHistory]);

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
    const newUserMessage = messageContent.trim();
    if (newUserMessage === '' || isPending || !currentChatId) return;

    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: newUserMessage };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setChatHistory(prev => ({ ...prev, [currentChatId]: updatedMessages }));
    setInput('');

    startTransition(async () => {
      try {
        const history: HistoryItem[] = updatedMessages
          .slice(0, -1)
          .slice(-MAX_HISTORY_MESSAGES)
          .map(msg => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content,
          }));

        const response = await ragLmChat({ // Use the new flow function
          prompt: newUserMessage,
          history: history,
          sessionId: currentChatId,
        });

        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response.content,
        };
        setMessages(prev => [...prev, assistantMessage]);
        setChatHistory(prev => ({ ...prev, [currentChatId]: [...updatedMessages, assistantMessage] }));

      } catch (error) {
        console.error('Chat API error:', error);
        const errorMessage = error instanceof Error ? error.message : "I'm having trouble connecting. Please try again later.";
        toast({
          variant: "destructive",
          title: "An Error Occurred",
          description: errorMessage,
        });
        const assistantErrorMessage: Message = {
          id: `assistant-error-${Date.now()}`,
          role: 'assistant',
          content: `Error: ${errorMessage}`,
        };
        setMessages(prev => [...prev, assistantErrorMessage]);
        setChatHistory(prev => ({ ...prev, [currentChatId]: [...updatedMessages, assistantErrorMessage] }));
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const handleNewChat = () => {
    const newId = generateSessionId();
    setChatHistory(prev => ({ ...prev, [newId]: [] }));
    setCurrentChatId(newId);
    toast({ title: "New Chat Started" });
  };
  
  const handleDeleteChat = (chatId: string) => {
    const newChatHistory = { ...chatHistory };
    delete newChatHistory[chatId];
    setChatHistory(newChatHistory);
    
    if (currentChatId === chatId) {
      const remainingChatIds = Object.keys(newChatHistory);
      if (remainingChatIds.length > 0) {
        setCurrentChatId(remainingChatIds[0]);
      } else {
        handleNewChat();
      }
    }
    toast({ title: "Chat Deleted" });
  };

  const handleDownload = () => {
    const conversationText = messages.map(msg => `${msg.role.charAt(0).toUpperCase() + msg.role.slice(1)}:\n${msg.content}`).join('\n\n---\n\n');
    const blob = new Blob([conversationText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `uhuru-rag-lm-chat-${new Date().toISOString().replace(/:/g, '-')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: "Conversation Downloaded" });
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen w-screen">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 bg-card border-r">
          <div className="p-4 border-b">
            <Button variant="outline" className="w-full justify-start gap-2" onClick={handleNewChat}>
              <Plus className="h-4 w-4" /> New Chat
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {Object.keys(chatHistory).reverse().map(chatId => (
                <div key={chatId} className="relative group">
                    <Button
                        variant={currentChatId === chatId ? 'secondary' : 'ghost'}
                        className="w-full justify-start gap-2 truncate"
                        onClick={() => setCurrentChatId(chatId)}
                    >
                        <MessageSquare className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">
                        {chatHistory[chatId][0]?.content || 'New Chat'}
                        </span>
                    </Button>
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDeleteChat(chatId)}>
                                    <Trash2 className="h-4 w-4"/>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right"><p>Delete chat</p></TooltipContent>
                         </Tooltip>
                    </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t flex flex-col gap-2">
            <Button variant="default" className="w-full justify-start gap-2" onClick={handleDownload} disabled={messages.length === 0}>
                <Download className="h-4 w-4" /> Download Chat
            </Button>
             <div className="flex justify-between items-center pt-2">
                <Link href="/">
                  <Logo />
                </Link>
                <ThemeToggle />
             </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-h-0">
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
              {messages.length === 0 && !isPending && (
                <div className="text-center pt-20">
                    <div className="inline-block p-4 bg-primary rounded-full mb-4">
                        <GraduationCap className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold font-headline">LM RAG</h2>
                    <p className="text-muted-foreground mt-2">Ask me anything about the LM.</p>
                </div>
              )}
              {messages.map((message) => (
                <div key={message.id} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                  {message.role === 'assistant' && (
                    <div className="bg-primary text-primary-foreground rounded-full p-2.5 flex-shrink-0">
                      <Bot className="h-6 w-6" />
                    </div>
                  )}
                  <Card className={`max-w-[85%] p-4 text-base shadow-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </Card>
                  {message.role === 'user' && (
                    <div className="bg-muted text-muted-foreground rounded-full p-2.5 flex-shrink-0">
                      <User className="h-6 w-6" />
                    </div>
                  )}
                </div>
              ))}
              {isPending && (
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full p-2.5">
                    <Bot className="h-6 w-6" />
                  </div>
                  <Card className="bg-muted p-4">
                    <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
                  </Card>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="px-4 pb-4 pt-2 w-full max-w-7xl mx-auto">
            <div className="relative">
                <textarea
                    placeholder="Message LM AI"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isPending}
                    className="w-full text-base h-12 p-3 pr-12 border rounded-xl shadow-lg focus-visible:ring-1 focus-visible:ring-ring resize-none bg-card"
                    rows={1}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Button variant="ghost" size="icon" onClick={() => handleSend(input)} disabled={isPending || input.trim() === ''} className="h-9 w-9">
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
                UhurU AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
