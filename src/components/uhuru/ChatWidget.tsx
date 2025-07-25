
"use client";

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, Bot, User, Loader, Mic, Square, MessageCircle, Paperclip, FileText } from 'lucide-react';
import { chat, speechToText, handleFileUpload as processFile } from '@/ai/flows/chat-flow';
import type { HistoryItem } from '@/ai/types';
import { useToast } from '@/hooks/use-toast';
import { chatbotWelcomeMessage } from '@/chatbot/chatbot-welcome';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import AudioPlayer from './AudioPlayer';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  audioUrl?: string;
  fileName?: string;
  audioMetadata?: {
    duration: number;
    currentTime: number;
    isPlaying: boolean;
  };
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
  const [isRecording, setIsRecording] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string | null>(null);
  
  const sessionIdRef = useRef<string | null>(null);
  const sessionLanguageRef = useRef<string | null>(null);
  
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

  const handleAudioAction = (messageId: string, action: 'play' | 'pause' | 'seek' | 'load', value?: number) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const audio = audioRef.current;
        if (!audio) return msg;

        switch (action) {
          case 'load':
            if (audio.src !== msg.audioUrl) {
                audio.src = msg.audioUrl!;
                audio.onloadedmetadata = () => {
                    setMessages(p => p.map(m => m.id === messageId ? { ...m, audioMetadata: { ...m.audioMetadata!, duration: audio.duration, currentTime: 0 } } : m));
                };
                audio.ontimeupdate = () => {
                    setMessages(p => p.map(m => m.id === messageId ? { ...m, audioMetadata: { ...m.audioMetadata!, currentTime: audio.currentTime } } : m));
                };
                audio.onended = () => handleAudioAction(messageId, 'pause');
            }
            break;
          case 'play':
            audio.play();
            return { ...msg, audioMetadata: { ...msg.audioMetadata!, isPlaying: true } };
          case 'pause':
            audio.pause();
            return { ...msg, audioMetadata: { ...msg.audioMetadata!, isPlaying: false } };
          case 'seek':
            if (value !== undefined) audio.currentTime = value;
            return { ...msg, audioMetadata: { ...msg.audioMetadata!, currentTime: value! } };
        }
      }
      // Pause other messages
      return { ...msg, audioMetadata: msg.audioMetadata ? { ...msg.audioMetadata, isPlaying: false } : undefined };
    }));
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
        
        const { text: aiResponseText, audioDataUri, sessionLanguage } = await chat(newUserMessage, historyForAI, isVoiceInput, sessionIdRef.current!, sessionLanguageRef.current);
        logClientTrace(functionName, { received_aiResponse: aiResponseText, has_audio: !!audioDataUri });
        
        if (sessionLanguage) {
            sessionLanguageRef.current = sessionLanguage;
            setCurrentLanguage(languageCodeMap[sessionLanguage.toLowerCase()] || sessionLanguage);
            logClientTrace(functionName, { session_language_set: sessionLanguage });
        }
        
        const assistantMessage: Message = {
            id: assistantMessageId,
            role: 'assistant',
            content: aiResponseText,
            audioUrl: audioDataUri,
            audioMetadata: audioDataUri ? { duration: 0, currentTime: 0, isPlaying: false } : undefined,
        };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
        if (audioDataUri) {
            handleAudioAction(assistantMessageId, 'load');
        }

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

  useEffect(() => {
    if (!audioRef.current) {
        audioRef.current = new Audio();
    }
  }, []);

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50">
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
                        {message.fileName ? (
                              <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  <span>{message.content}</span>
                              </div>
                          ) : (
                              <p className="whitespace-pre-wrap">{message.content}</p>
                          )}
                        {message.audioUrl && message.audioMetadata && (
                          <AudioPlayer
                            isPlaying={message.audioMetadata.isPlaying}
                            duration={message.audioMetadata.duration}
                            currentTime={message.audioMetadata.currentTime}
                            onPlay={() => handleAudioAction(message.id, 'play')}
                            onPause={() => handleAudioAction(message.id, 'pause')}
                            onSeek={(time) => handleAudioAction(message.id, 'seek', time)}
                          />
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
                <div className="relative flex items-center gap-1">
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx,.txt" />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" disabled={!isUploadEnabled} onClick={() => fileInputRef.current?.click()} className="h-8 w-8"><Paperclip className="h-4 w-4" /></Button>
                    </TooltipTrigger>
                    <TooltipContent><p>{isUploadEnabled ? "Adjuntar documento de proyecto" : "Proporcione un email para habilitar la subida"}</p></TooltipContent>
                  </Tooltip>
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
                      <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleMicClick}
                          disabled={isPending && !isRecording}
                          className={cn("h-8 w-8", isRecording && "text-red-500 hover:text-red-600")}
                      >
                          {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                      <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSend(input, false)}
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
      </div>
    </TooltipProvider>
  );
}

export default function ChatWidget() {
  const pathname = usePathname();

  if (pathname === '/ai-chat') {
    return null;
  }
  
  return <ChatWidgetContent />;
}
