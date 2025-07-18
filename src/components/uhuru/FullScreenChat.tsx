
"use client";

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Loader, Mic, Play, Pause, Square, Send, Download, PlusSquare, Languages } from 'lucide-react';
import { chat, speechToText } from '@/ai/flows/chat-flow';
import type { HistoryItem } from '@/ai/types';
import { useToast } from '@/hooks/use-toast';
import { chatbotWelcomeMessage } from '@/chatbot/chatbot-welcome';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '../ui/card';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  audioUrl?: string;
  isPlaying?: boolean;
}

const MAX_HISTORY_MESSAGES = 50;
const INITIAL_MESSAGE_OBJECT: Message = { 
  id: 'initial', 
  role: 'assistant', 
  content: chatbotWelcomeMessage 
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
  const [isRecording, setIsRecording] = useState(false);
  
  const sessionIdRef = useRef<string | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const { toast } = useToast();
  
  useEffect(() => {
    if (!sessionIdRef.current) {
        sessionIdRef.current = generateSessionId();
        logClientTrace('initSession', { sessionId: sessionIdRef.current });
    }
  }, []);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, [messages, isPending]);

  const handleTogglePlay = (audioUrl: string, messageId: string) => {
    const isCurrentlyPlaying = messages.find(m => m.id === messageId)?.isPlaying;

    setMessages(prev => prev.map((msg) => ({
      ...msg,
      isPlaying: msg.id === messageId ? !msg.isPlaying : false,
    })));

    if (audioRef.current && !audioRef.current.paused && isCurrentlyPlaying) {
      audioRef.current.pause();
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.onended = () => {
          setMessages(prev => prev.map(msg => ({ ...msg, isPlaying: false })));
        };
      }
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
  };

  const handleSend = async (messageContent: string, isVoiceInput = false) => {
    const functionName = 'handleSend';
    const newUserMessage = messageContent.trim();
    if (newUserMessage === '' || isPending || !sessionIdRef.current) return;
    
    logClientTrace(functionName, { input_newUserMessage: newUserMessage, isVoiceInput, sessionId: sessionIdRef.current });

    const userMessageId = `user-${Date.now()}`;
    const assistantMessageId = `assistant-${Date.now()}`;

    const userMessageObject: Message = { id: userMessageId, role: 'user', content: newUserMessage };
    setMessages((prevMessages) => [...prevMessages, userMessageObject]);
    setInput('');
    
    startTransition(async () => {
      logClientTrace(functionName, { status: 'transition_started' });
      
      const historyForAI: HistoryItem[] = messages
        .filter(msg => msg.id !== 'initial')
        .slice(-MAX_HISTORY_MESSAGES)
        .map(msg => ({ role: msg.role, content: msg.content }));

      try {
        logClientTrace(functionName, { calling_chat_flow_with_history: historyForAI });
        
        const { text: aiResponseText, audioDataUri } = await chat(newUserMessage, historyForAI, isVoiceInput, sessionIdRef.current!);
        logClientTrace(functionName, { received_aiResponse: aiResponseText, has_audio: !!audioDataUri });
        
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: assistantMessageId, role: 'assistant', content: aiResponseText, audioUrl: audioDataUri },
        ]);

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        logClientTrace(functionName, { error_in_transition: errorMessage });
        
        setMessages((prevMessages) => [
            ...prevMessages,
            { id: `error-${Date.now()}`, role: 'assistant', content: `Error: ${errorMessage}` },
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
      handleSend(input, false);
    }
  };

  const startRecording = async () => {
    if (!sessionIdRef.current) return;
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async () => {
                const base64Audio = reader.result as string;
                logClientTrace('handleMic_onStop', { status: 'transcribing_audio' });
                startTransition(async () => {
                    try {
                        const { text } = await speechToText(base64Audio, sessionIdRef.current!);
                        logClientTrace('handleMic_onStop', { transcribed_text: text });
                        if (text) {
                            handleSend(text, true);
                        }
                    } catch (error) {
                        toast({ variant: "destructive", title: "Transcription Error", description: "Could not transcribe audio." });
                    }
                });
            };
            stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        logClientTrace('handleMicClick', { status: 'recording_started' });
    } catch (error) {
        console.error("Error starting recording:", error);
        toast({ variant: "destructive", title: "Microphone Error", description: "Could not access microphone." });
    }
  };

  const stopRecording = () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
          logClientTrace('handleMicClick', { status: 'recording_stopped' });
      }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleDownload = () => {
    const conversationText = messages
      .map(msg => `${msg.role.charAt(0).toUpperCase() + msg.role.slice(1)}:\n${msg.content}`)
      .join('\n\n---------------------------------\n\n');
    
    const blob = new Blob([conversationText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    link.download = `uhuru-chat-${timestamp}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({ title: "Conversation Downloaded", description: "Your chat history has been saved." });
  };

  const handleNewChat = () => {
    setMessages([INITIAL_MESSAGE_OBJECT]);
    sessionIdRef.current = generateSessionId();
    toast({ title: "New Chat Started", description: "Ready for your questions!" });
  };
  
  return (
    <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto p-4 min-h-0">
        <div className="flex items-center justify-between pb-4 border-b mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Languages className="h-5 w-5" />
                <span>UhurU AI | Polyglot</span>
            </div>
            <div className="flex items-center gap-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={handleDownload} disabled={messages.length <= 1}>
                                <Download className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Download conversation</p></TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={handleNewChat}>
                                <PlusSquare className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>New chat</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>

        <ScrollArea className="flex-1 pr-4 -mr-4" ref={scrollAreaRef}>
            <div className="space-y-6 pb-4">
            {messages.map((message) => (
                <div
                key={message.id}
                className={`flex items-start gap-4 ${
                    message.role === 'user' ? 'justify-end' : ''
                }`}
                >
                {message.role === 'assistant' && (
                    <div className="bg-primary text-primary-foreground rounded-full p-2.5 flex-shrink-0">
                    <Bot className="h-6 w-6" />
                    </div>
                )}
                <div
                    className={`max-w-[80%] rounded-xl p-4 text-base shadow-sm ${
                    message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.audioUrl && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 mt-2"
                        onClick={() => handleTogglePlay(message.audioUrl!, message.id)}
                    >
                        {message.isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    )}
                </div>
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
                <div className="bg-muted text-muted-foreground rounded-xl p-4">
                    <Loader className="h-6 w-6 animate-spin" />
                </div>
                </div>
            )}
            </div>
        </ScrollArea>
        <div className="pt-4 mt-auto">
            <Card className="relative shadow-lg">
                <CardContent className="p-2">
                    <div className="relative flex items-center gap-2">
                        <Input
                            type="text"
                            placeholder="Ask something about UhurU..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isPending}
                            className="text-base h-12 pr-24 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleMicClick}
                                disabled={isPending && !isRecording}
                                className={cn("h-9 w-9", isRecording && "text-red-500 hover:text-red-600")}
                            >
                                {isRecording ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleSend(input, false)}
                                disabled={isPending || input.trim() === ''}
                                className="h-9 w-9"
                            >
                                <Send className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
