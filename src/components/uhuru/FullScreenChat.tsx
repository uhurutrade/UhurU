
"use client";

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Loader, Mic, Play, Pause, Square, Send, Download, PlusSquare, Globe, Paperclip, FileText } from 'lucide-react';
import { chat, speechToText, handleFileUpload as processFile } from '@/ai/flows/chat-flow';
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
  fileName?: string;
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const { toast } = useToast();
  
  useEffect(() => {
    if (!sessionIdRef.current) {
        sessionIdRef.current = generateSessionId();
        logClientTrace('initSession', { sessionId: sessionIdRef.current });
    }
  }, []);

  const isUploadEnabled = messages.some(
    (msg) => msg.role === 'assistant' && msg.content.includes('He habilitado la opción para adjuntar archivos')
  );

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
    
    const userMessageId = `user-${Date.now()}`;
    const assistantMessageId = `assistant-${Date.now()}`;

    const userMessageObject: Message = { id: userMessageId, role: 'user', content: newUserMessage };

    setMessages((prev) => [...prev, userMessageObject]);
    setInput('');
    
    startTransition(async () => {
      const historyForAI: HistoryItem[] = [...messages, userMessageObject]
        .filter(m => m.id !== 'initial')
        .slice(-MAX_HISTORY_MESSAGES)
        .map(msg => ({ role: msg.role, content: msg.content }));

      try {
        const { text: aiResponseText, audioDataUri } = await chat(newUserMessage, historyForAI, isVoiceInput, sessionIdRef.current!);
        
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: assistantMessageId, role: 'assistant', content: aiResponseText, audioUrl: audioDataUri },
        ]);

      } catch (error) {
        const errorMessage = error instanceof Error ? `Sorry, there was a problem: ${error.message}` : "Sorry, I couldn't connect to the assistant at this time. Please try again later.";
        
        setMessages((prevMessages) => [
            ...prevMessages,
            { id: `error-${Date.now()}`, role: 'assistant', content: errorMessage },
        ]);

        toast({
          variant: "destructive",
          title: "Chat Error",
          description: "Sorry, I'm having trouble connecting. Please try again later.",
        });
      }
    });
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !sessionIdRef.current) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (e) => {
        const fileDataUri = e.target?.result as string;
        if (!fileDataUri) {
            toast({ variant: 'destructive', title: 'Error', description: 'Could not read the file.' });
            return;
        }

        const userMessageId = `user-file-${Date.now()}`;
        const assistantMessageId = `assistant-file-${Date.now()}`;

        const userMessageObject: Message = {
            id: userMessageId,
            role: 'user',
            content: `Enviaste el archivo: ${file.name}`,
            fileName: file.name
        };

        setMessages(prev => [...prev, userMessageObject]);
        
        startTransition(async () => {
          try {
              const response = await processFile(fileDataUri, file.name, sessionIdRef.current!);
              setMessages(prev => [...prev, {
                  id: assistantMessageId,
                  role: 'assistant',
                  content: response.text
              }]);
          } catch (error) {
              const errorMessage = error instanceof Error ? error.message : "An unknown error occurred while processing the file.";
              setMessages(prev => [...prev, {
                  id: `error-${Date.now()}`,
                  role: 'assistant',
                  content: `Error processing file: ${errorMessage}`
              }]);
              toast({ variant: 'destructive', title: 'File Processing Error', description: errorMessage });
          }
        });
    };
    event.target.value = '';
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
                startTransition(async () => {
                    try {
                        const { text } = await speechToText(base64Audio, sessionIdRef.current!);
                        if (text) handleSend(text, true);
                    } catch (error) {
                        toast({ variant: "destructive", title: "Transcription Error", description: "Could not transcribe audio." });
                    }
                });
            };
            stream.getTracks().forEach(track => track.stop());
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
    } catch (error) {
        toast({ variant: "destructive", title: "Microphone Error", description: "Could not access microphone." });
    }
  };

  const stopRecording = () => {
      if (mediaRecorderRef.current?.state === "recording") {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
      }
  };

  const handleMicClick = () => { isRecording ? stopRecording() : startRecording(); };
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
    toast({ title: "New Chat Started" });
  };
  
  return (
    <TooltipProvider>
      <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto p-4 min-h-0">
          <div className="flex items-center justify-between pb-4 border-b mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-5 w-5" />
                  <span>UhurU AI | All language - Polyglot</span>
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
                          {message.fileName ? (
                              <div className="flex items-center gap-2">
                                  <FileText className="h-5 w-5" />
                                  <span>{message.content}</span>
                              </div>
                          ) : (
                              <p className="whitespace-pre-wrap">{message.content}</p>
                          )}
                          {message.audioUrl && (<Button variant="ghost" size="icon" className="h-8 w-8 mt-2" onClick={() => handleTogglePlay(message.audioUrl!, message.id)}>{message.isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}</Button>)}
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
                          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx,.txt" />
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" disabled={!isUploadEnabled} onClick={() => fileInputRef.current?.click()} className="h-9 w-9 ml-1"><Paperclip className="h-5 w-5" /></Button>
                            </TooltipTrigger>
                            <TooltipContent><p>{isUploadEnabled ? "Adjuntar documento de proyecto" : "Proporcione un email para habilitar la subida"}</p></TooltipContent>
                          </Tooltip>
                          <Input type="text" placeholder="Ask something..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} disabled={isPending} className="text-base h-12 pr-24 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"/>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                              <Button variant="ghost" size="icon" onClick={handleMicClick} disabled={isPending && !isRecording} className={cn("h-9 w-9", isRecording && "text-red-500 hover:text-red-600")}>{isRecording ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}</Button>
                              <Button variant="ghost" size="icon" onClick={() => handleSend(input, false)} disabled={isPending || input.trim() === ''} className="h-9 w-9"><Send className="h-5 w-5" /></Button>
                          </div>
                      </div>
                  </CardContent>
              </Card>
          </div>
      </div>
    </TooltipProvider>
  );
}
