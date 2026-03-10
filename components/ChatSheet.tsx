"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Info } from "lucide-react";
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

type MessageRole = "user" | "assistant" | "system";

interface ChatMessage {
    id: string;
    role: MessageRole;
    content: string;
    toolCalls?: any[];
    toolResults?: any[];
}

export default function ChatSheet() {
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
                <SheetHeader className="p-6 border-b bg-muted/20">
                    <SheetTitle className="flex items-center gap-2 text-xl tracking-tight">
                        <Bot className="text-primary" />
                        AI Agent Chat
                    </SheetTitle>
                    <p className="text-sm text-muted-foreground">
                        Ask questions, look up knowledge, or generate dynamic content with the Qwen3 AI Agent.
                    </p>
                </SheetHeader>

                <ScrollArea className="flex-1 p-6">
                    <div className="flex flex-col gap-6 w-full">
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
                                            className={`rounded-2xl px-5 py-3 shadow-sm ${
                                                message.role === "user"
                                                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                                                    : "bg-muted text-foreground rounded-tl-sm border"
                                            }`}
                                        >
                                            <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                                                {message.content}
                                            </p>
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
                                    <div className="rounded-2xl px-5 py-3 shadow-sm bg-muted text-foreground rounded-tl-sm border flex items-center gap-3">
                                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                        <p className="text-sm font-medium text-muted-foreground">Agent is thinking...</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={scrollRef} className="h-1" />
                    </div>
                </ScrollArea>

                <div className="p-4 bg-background/80 border-t backdrop-blur">
                    <div className="flex gap-3">
                        <Textarea
                            placeholder="Type your message here..."
                            className="min-h-[60px] max-h-[150px] flex-1 resize-none rounded-2xl bg-background px-4 py-3 text-sm shadow-sm focus-visible:ring-1 focus-visible:ring-primary"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                        />
                        <Button
                            size="icon"
                            className="h-[60px] w-[60px] shrink-0 rounded-2xl shadow-md transition-transform active:scale-95"
                            onClick={handleSendMessage}
                            disabled={isLoading || !input.trim()}
                        >
                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                            <span className="sr-only">Send</span>
                        </Button>
                    </div>
                    <div className="mt-2 text-center text-[10px] text-muted-foreground">
                        Press <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1 font-mono font-medium text-muted-foreground opacity-100">Enter</kbd> to send, <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1 font-mono font-medium text-muted-foreground opacity-100">Shift</kbd> + <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1 font-mono font-medium text-muted-foreground opacity-100">Enter</kbd> to add a new line
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
