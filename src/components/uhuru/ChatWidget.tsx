
"use client";

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, X, Send, Bot, User, Loader, Mic, Play, Pause } from 'lucide-react';
import { chat, textToSpeech } from '@/ai/flows/chat-flow';
import type { HistoryItem } from '@/ai/types';
import { useToast } from '@/hooks/use-toast';
import { chatbotWelcomeMessage } from '@/chatbot/chatbot-welcome';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  audioUrl?: string;
  isPlaying?: boolean;
}

const MAX_HISTORY_MESSAGES = 50;
const INITIAL_MESSAGE = chatbotWelcomeMessage;

function logClientTrace(functionName: string, data: any) {
    if (process.env.NEXT_PUBLIC_TRACE === 'ON') {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] uhurulog_${functionName}:`, data);
    }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: INITIAL_MESSAGE },
  ]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isRecording, setIsRecording] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check for SpeechRecognition API support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'es-ES'; // Default language, can be changed
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
        logClientTrace('SpeechRecognition', { status: 'started' });
      };
      recognition.onend = () => {
        setIsRecording(false);
        logClientTrace('SpeechRecognition', { status: 'ended' });
      };
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        logClientTrace('SpeechRecognition', { transcript });
        setInput(transcript);
      };
      recognition.onerror = (event) => {
        logClientTrace('SpeechRecognition', { error: event.error });
        toast({
            variant: "destructive",
            title: "Voice Error",
            description: `Could not recognize voice: ${event.error}`,
        });
      };
      recognitionRef.current = recognition;
    }
  }, [toast]);


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

  const handleTogglePlay = (audioUrl: string, index: number) => {
    setMessages(prev => prev.map((msg, i) => ({ ...msg, isPlaying: i === index ? !msg.isPlaying : false })));

    if (audioRef.current && !audioRef.current.paused && messages[index].isPlaying) {
      audioRef.current.pause();
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.onended = () => {
          setMessages(prev => prev.map(msg => ({ ...msg, isPlaying: false })));
        };
      }
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  };

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
        const aiResponseText = await chat(newUserMessage, historyForAI);
        logClientTrace(functionName, { received_aiResponse: aiResponseText });
        
        const { media: audioDataUri } = await textToSpeech(aiResponseText);
        logClientTrace(functionName, { received_audio: !!audioDataUri });

        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: aiResponseText, audioUrl: audioDataUri },
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

  const handleMicClick = () => {
    if (recognitionRef.current) {
        if (isRecording) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    } else {
        toast({
            variant: "destructive",
            title: "Unsupported",
            description: "Your browser does not support voice recognition.",
        });
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
                      {message.audioUrl && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 mt-2"
                          onClick={() => handleTogglePlay(message.audioUrl!, index)}
                        >
                          {message.isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                      )}
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
              <div className="relative flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Ask something..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isPending}
                  className="pr-10"
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleMicClick}
                        disabled={isPending || !recognitionRef.current}
                        className={cn("h-8 w-8", isRecording && "text-red-500")}
                    >
                        <Mic className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleSend}
                        disabled={isPending}
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
                <MessageSquare className="h-8 w-8 text-primary-foreground" />
                </Button>
            </div>
        )}
    </div>
  );
}

    