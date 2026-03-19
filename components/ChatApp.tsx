"use client";

import { useChat } from "@/hooks/useChat";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatApp() {
    const { messages, fetchStatus, sendStatus, send } = useChat();

    return (
        <div
            className="min-h-dvh flex flex-col"
            style={{
                backgroundColor: "#ffffff",
                backgroundImage: `url("https://wallpapers.com/images/high/telegram-cip-art-green-background-6z07z4i6i5p0dfrs.webp")`,
            }}
        >
            <main className="flex flex-col w-full max-w-3xl mx-auto h-dvh">
                <MessageList
                    messages={messages}
                    isLoading={fetchStatus === "loading"}
                />
                <MessageInput onSend={send} isSending={sendStatus === "loading"} />
            </main>
        </div>
    );
}