import { LastMessageDto, MessageDto } from "../DTO/message.dto.ts";
import { LastMessage, Message } from "../models/message.ts";
import { UserMapper } from "./user.mapper.ts";

export class MessageMapper {
    public static lastMessagefromDto(dto: LastMessageDto): LastMessage {
        return {
            user: UserMapper.fromDto(dto.user),
            date: new Date(dto.time),
            content: dto.content,
        };
    }

    public static fromDto(dto: MessageDto): Message {
        return {
            chatId: dto.chat_id,
            time: new Date(dto.time),
            type: dto.type,
            userId: dto.user_id,
            content: dto.content,
            file:
                dto.file != null
                    ? {
                          id: dto.file.id,
                          userId: dto.file.user_id,
                          path: dto.file.path,
                          filename: dto.file.filename,
                          contentType: dto.file.content_type,
                          contentSize: dto.file.content_size,
                          uploadDate: new Date(dto.file.upload_date),
                      }
                    : undefined,
        };
    }
}
