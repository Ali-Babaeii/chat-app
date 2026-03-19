"use client";

import { useState, useRef, KeyboardEvent } from "react";

interface Props {
    onSend: (text: string) => void;
    isSending: boolean;
}

export default function MessageInput({ onSend, isSending }: Props) {
    const [text, setText] = useState("");
    const taRef = useRef<HTMLTextAreaElement>(null);

    const submit = () => {
        if (!text.trim() || isSending) return;
        onSend(text.trim());
        setText("");
        if (taRef.current) taRef.current.style.height = "auto";
    };

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
    };

    return (
        <div className="bg-[#000000] px-[100px] py-[8px] py-2.5 shrink-0">
            <div className="flex items-end gap-2.5 max-w-4xl mx-auto">
                <textarea
                    ref={taRef}
                    value={text}
                    onChange={e => {
                        setText(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                    }}
                    onKeyDown={onKeyDown}
                    placeholder="Message"
                    rows={1}
                    disabled={isSending}
                    aria-label="Message input"
                    className="flex-1 py-[10px] rounded-lg px-4 py-3 text-[15px] text-[#2d3142]
                     bg-white outline-none min-h-[44px] max-h-[120px] 
                     placeholder:text-gray-300 focus:ring-2 
                     disabled:opacity-60 shadow-sm"
                />
                <button
                    onClick={submit}
                    disabled={!text.trim() || isSending}
                    style={{ color: "white" }}
                    aria-label="Send message"
                    className=" px-[18px] ml-[8px] py-[11px] rounded-[8px] bg-[#1780f0] text-white font-semibold text-[15px]
                     hover:bg-[#2353f3] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </div>
        </div>
    );
}