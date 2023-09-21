import { ChatDto } from "../DTO/chat.dto.ts";
import { Chat } from "../models/chat.ts";
import { MessageMapper } from "./message.mapper.ts";

export class ChatMapper {
    public static fromDto(dto: ChatDto): Chat {
        return {
            id: dto.id,
            title: dto.title,
            avatar: dto.avatar,
            unreadCount: dto.unread_count,
            createdBy: dto.created_by,
            lastMessage: MessageMapper.fromDto(dto.last_message),
        };
    }
}
