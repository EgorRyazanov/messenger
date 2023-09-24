import { User } from "./user.ts";

export interface LastMessage {
    user: User | null;
    content: string;
    date: Date;
}

export interface Message {
    chatId: number;
    time: Date;
    type: string;
    userId: number;
    content: string;
    file?: {
        id: number;
        userId: number;
        path: string;
        filename: string;
        contentType: string;
        contentSize: number;
        uploadDate: Date;
    };
}
