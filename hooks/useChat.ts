"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { fetchMessages, sendMessage } from "@/lib/api";
import { Message, FetchStatus } from "@/types";

const POLL_MS = 5000;
export const CURRENT_USER = "You";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("idle");
  const [sendStatus, setSendStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const latestRef = useRef<string | null>(null);

  const load = useCallback(async () => {
    setFetchStatus("loading");
    setError(null);
    try {
      const data = await fetchMessages({ limit: 50 });
      const sorted = [...data.messages];
      setMessages(sorted);
      if (sorted.length) latestRef.current = sorted.at(-1)!.createdAt;
      setFetchStatus("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load messages");
      setFetchStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (fetchStatus !== "success") return;
    const id = setInterval(async () => {
      try {
        const data = await fetchMessages(
          latestRef.current ? { after: latestRef.current } : undefined,
        );
        const sorted = [...data.messages];
        if (!sorted.length) return;
        setMessages((prev) => {
          const ids = new Set(prev.map((m) => m._id));
          const fresh = sorted.filter((m) => !ids.has(m._id));
          if (!fresh.length) return prev;
          latestRef.current = fresh.at(-1)!.createdAt;
          return [...prev, ...fresh];
        });
      } catch {}
    }, POLL_MS);
    return () => clearInterval(id);
  }, [fetchStatus]);

  const send = useCallback(async (text: string) => {
    if (!text.trim()) return;
    setSendStatus("loading");
    const optimistic: Message = {
      _id: `opt-${Date.now()}`,
      message: text.trim(),
      author: CURRENT_USER,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    try {
      const real = await sendMessage({
        message: text.trim(),
        author: CURRENT_USER,
      });
      setMessages((prev) =>
        prev.map((m) => (m._id === optimistic._id ? real : m)),
      );
      latestRef.current = real.createdAt;
      setSendStatus("success");
    } catch (e) {
      setMessages((prev) => prev.filter((m) => m._id !== optimistic._id));
      setError(e instanceof Error ? e.message : "Failed to send");
      setSendStatus("error");
    }
  }, []);

  return { messages, fetchStatus, sendStatus, error, send, retry: load };
}
