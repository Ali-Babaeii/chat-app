"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/types";
import MessageBubble from "./MessageBubble";

interface Props {
    messages: Message[];
    isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: Props) {
    const bottomRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div
            ref={containerRef}
            className="flex-1 overflow-y-auto px-4 py-5"
            role="list"
            aria-label="Chat messages"
            aria-live="polite"
        >
            {isLoading && !messages.length && (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-gray-400">
                    <div className="w-7 h-7 rounded-full border-2 border-blue-200 border-t-blue-500 animate-spin" />
                    <span className="text-sm">Loading messages…</span>
                </div>
            )}

            {!isLoading && !messages.length && (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                    No messages yet — say hello!
                </div>
            )}

            {messages.map((msg) => (
                <div key={msg._id} role="listitem">
                    <MessageBubble msg={msg} />
                </div>
            ))}

            <div ref={bottomRef} />
        </div>
    );
}