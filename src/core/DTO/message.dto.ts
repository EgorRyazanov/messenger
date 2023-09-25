import { UserDto } from "./user.dto.ts";

export interface LastMessageDto {
    user: UserDto;
    time: string;
    content: string;
}

export interface MessageDto {
    chat_id: number;
    time: string;
    type: string;
    user_id: number;
    content: string;
    file?: {
        id: number;
        user_id: number;
        path: string;
        filename: string;
        content_type: string;
        content_size: number;
        upload_date: string;
    };
}
