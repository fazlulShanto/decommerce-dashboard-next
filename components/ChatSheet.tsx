"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Info, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { marked } from 'marked';
import ReactMarkdown from 'react-markdown';

type MessageRole = "user" | "assistant" | "system";

interface ChatMessage {
    id: string;
    role: MessageRole;
    content: string;
    toolCalls?: any[];
    toolResults?: any[];
}

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map(token => token.raw);
}



export default function ChatSheet({ guildId }: { guildId?: string }) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll inside scroll area
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading]);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
        };

        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    guildId,
                    // Only send content and role to the backend to keep it clean
                    messages: newMessages.map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to get response");
            }

            const data = await response.json();

            if (data.error) {
                 setMessages((prev) => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: `Error: ${data.error}`,
                    },
                ]);
            } else {
                 setMessages((prev) => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: data.text,
                        toolCalls: data.toolCalls,
                        toolResults: data.toolResults,
                    },
                ]);
            }
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: "Sorry, I encountered an error while processing your request.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 shadow-md">
                    <Bot size={18} />
                    <span className="font-semibold">Chat with AI</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-xl md:max-w-2xl flex flex-col p-0 bg-background/95 backdrop-blur-sm border-l border-border/50">
                <SheetHeader className="p-4 border-b bg-muted/20">
                    <div className="flex items-start justify-between">
                        <div>
                            <SheetTitle className="flex items-center gap-1.5 text-base font-semibold tracking-tight text-left">
                                <Bot className="text-primary" size={16} />
                                AI Agent Chat
                            </SheetTitle>
                            <p className="text-[12px] font-normal text-muted-foreground mt-0.5 text-left leading-tight">
                                Ask questions, look up knowledge, or generate dynamic content with the AI Agent.
                            </p>
                        </div>
                    </div>
                </SheetHeader>

                <ScrollArea className="flex-1 p-4">
                    <div className="flex flex-col gap-4 w-full">
                        {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full min-h-[50vh] space-y-4 text-center text-muted-foreground">
                                <Bot size={64} className="opacity-20" />
                                <p className="text-lg">No messages yet.</p>
                                <p className="text-sm">Type a message below to start chatting with the agent!</p>
                            </div>
                        )}
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                            >
                                <Avatar className="h-10 w-10 border shadow-sm shrink-0">
                                    {message.role === "user" ? (
                                        <AvatarFallback><User size={20}/></AvatarFallback>
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                                            <Bot size={20} />
                                        </div>
                                    )}
                                </Avatar>
                                
                                <div className={`flex flex-col max-w-[85%] ${message.role === "user" ? "items-end" : "items-start"}`}>
                                    {message.content && message.content.trim() !== "" && (
                                        <div
                                            className={`rounded-2xl px-4 py-2.5 shadow-sm text-sm ${
                                                message.role === "user"
                                                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                                                    : "bg-muted text-foreground rounded-tl-sm border"
                                            }`}
                                        >
                                           <ReactMarkdown>{message.content}</ReactMarkdown>
                                            {/* <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                                                {message.content}
                                            </p> */}
                                        </div>
                                    )}

                                    {/* Display Tool Invocations if any */}
                                    {message.role === "assistant" && message.toolCalls && message.toolCalls.length > 0 && (
                                         <div className="mt-2 text-[11px] md:text-xs text-muted-foreground flex items-center gap-1.5 bg-background/50 border px-3 py-1.5 rounded-full shadow-sm">
                                            <Info size={14} className="text-primary shrink-0"/> 
                                            <span className="truncate">Used tool: {message.toolCalls.map(tc => tc.toolName).join(', ')}</span>
                                         </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        
                        {isLoading && (
                            <div className="flex gap-4">
                                <Avatar className="h-10 w-10 border shadow-sm shrink-0">
                                    <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                                        <Bot size={20} />
                                    </div>
                                </Avatar>
                                <div className="flex flex-col items-start">
                                    <div className="rounded-2xl px-4 py-2.5 shadow-sm bg-muted text-foreground rounded-tl-sm border flex items-center gap-3">
                                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                        <p className="text-[12px] font-normal text-muted-foreground">Agent is thinking...</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={scrollRef} className="h-1" />
                    </div>
                </ScrollArea>

                <div className="p-2 pt-2 border-t/50 border-t bg-background/50 backdrop-blur">
                    <div className="flex items-end gap-2">
             
                            <Textarea
                                placeholder="Type your message here..."
                                className="min-h-[44px] border border-primary/20 focus-within:border-primary/80 focus-within:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 resize-none bg-transparent px-4 py-2"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={isLoading}
                            />
              
                        <Button
                            size="icon"
                            className="h-11 w-11 rounded-2xl shadow-sm transition-transform active:scale-95 bg-primary/90 hover:bg-primary hover:ring-1 text-primary-foreground shrink-0"
                            onClick={handleSendMessage}
                            disabled={isLoading || !input.trim()}
                        >
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            <span className="sr-only">Send</span>
                        </Button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <div className="text-[10px] text-muted-foreground">
                            Press <kbd className="pointer-events-none inline-flex h-3.5 select-none items-center gap-1 rounded border bg-muted px-1 font-mono font-medium text-muted-foreground opacity-100">Enter</kbd> to send, <kbd className="pointer-events-none inline-flex h-3.5 select-none items-center gap-1 rounded border bg-muted px-1 font-mono font-medium text-muted-foreground opacity-100">Shift</kbd> + <kbd className="pointer-events-none inline-flex h-3.5 select-none items-center gap-1 rounded border bg-muted px-1 font-mono font-medium text-muted-foreground opacity-100">Enter</kbd> to add a new line
                        </div>
                        {messages.length > 0 && (
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setMessages([])} 
                                className="h-6 px-2 text-[10px] font-normal text-muted-foreground text-destructive hover:bg-destructive/90 shrink-0"
                            >
                                <Trash2 size={12} className="mr-1" />
                                Clear Chat
                            </Button>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
