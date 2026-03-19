import { Message, MessagesResponse, SendMessagePayload } from "@/types";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN ?? "super-secret-doodle-token";

const headers: HeadersInit = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${TOKEN}`,
};

export async function fetchMessages(params?: {
  limit?: number;
  after?: string;
}): Promise<MessagesResponse> {
  const url = new URL(`${BASE}/api/v1/messages`);
  if (params?.limit) url.searchParams.set("limit", String(params.limit));
  if (params?.after) url.searchParams.set("after", params.after);

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

  const json = await res.json();

  const messages: Message[] = Array.isArray(json) ? json : json.messages ?? [];
  return { messages };
}

export async function sendMessage(payload: SendMessagePayload): Promise<Message> {
  const res = await fetch(`${BASE}/api/v1/messages`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Send failed: ${res.status}`);
  return res.json();
}