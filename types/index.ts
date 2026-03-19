export interface Message {
  _id: string;
  message: string;
  author: string;
  createdAt: string;
}

export interface MessagesResponse {
  messages: Message[];
}

export interface SendMessagePayload {
  message: string;
  author: string;
}

export type FetchStatus = "idle" | "loading" | "success" | "error";
