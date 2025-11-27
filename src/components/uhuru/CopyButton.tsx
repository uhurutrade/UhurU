"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  textToCopy: string;
  buttonText?: string;
  variant?: "button" | "icon";
}

export default function CopyButton({ textToCopy, buttonText = "Copy", variant = "button" }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      toast({ title: "Copied to clipboard!" });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({ variant: "destructive", title: "Copy Failed", description: "Could not copy to clipboard." });
    }
  };

  return (
    <Button
      variant="outline"
      size={variant === 'icon' ? 'icon' : 'sm'}
      onClick={handleCopy}
      className={cn("gap-2", variant === 'icon' && "h-8 w-8")}
    >
      {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      {variant === 'button' && (isCopied ? 'Copied!' : buttonText)}
    </Button>
  );
}
