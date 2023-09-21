import { MessageDto } from "./message.dto.ts";

export interface ChatDto {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: MessageDto;
}
