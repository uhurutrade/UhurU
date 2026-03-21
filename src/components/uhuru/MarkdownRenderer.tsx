"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MARKDOWN_COMPONENTS: React.ComponentProps<typeof ReactMarkdown>['components'] = {
    p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
    strong: ({ children }) => (
        <strong className="font-semibold text-foreground bg-foreground/10 px-1.5 py-0.5 rounded-sm">
            {children}
        </strong>
    ),
    ul: ({ children }) => <ul className="list-disc ml-5 my-3 space-y-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal ml-5 my-3 space-y-2">{children}</ol>,
    li: ({ children }) => <li className="leading-snug">{children}</li>,
    h1: ({ children }) => <h1 className="text-xl font-bold mb-3 text-foreground border-b border-border pb-2">{children}</h1>,
    h2: ({ children }) => <h2 className="text-lg font-semibold mb-2 mt-4 text-foreground">{children}</h2>,
    h3: ({ children }) => <h3 className="text-base font-semibold mb-2 mt-3 text-muted-foreground uppercase tracking-wide">{children}</h3>,
    code: ({ inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '')
      if (!inline && match) {
        return (
          <pre className="bg-muted p-3 rounded-md overflow-x-auto my-3">
            <code className="font-mono text-sm text-foreground">{String(children).replace(/\n$/, '')}</code>
          </pre>
        )
      }
      return (
        <code className="bg-muted px-1.5 py-1 rounded-md font-mono text-sm text-accent" {...props}>
            {children}
        </code>
      )
    },
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-accent/50 pl-4 py-1 my-3 bg-accent/10 italic text-muted-foreground">
            {children}
        </blockquote>
    ),
    a: ({ href, children }) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
            {children}
        </a>
    )
};

export default function MarkdownRenderer({ content }: { content: string }) {
    return (
        <ReactMarkdown
            components={MARKDOWN_COMPONENTS}
            remarkPlugins={[remarkGfm]}
        >
            {content}
        </ReactMarkdown>
    );
}
