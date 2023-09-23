import { Message } from "./message.ts";

export interface Chat {
    id: number;
    title: string;
    avatar: string;
    unreadCount: number;
    createdBy: number;
    lastMessage: Message | null;
}
