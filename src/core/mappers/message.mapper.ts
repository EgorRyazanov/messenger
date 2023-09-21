import { MessageDto } from "../DTO/message.dto.ts";
import { Message } from "../models/message.ts";
import { UserMapper } from "./user.mapper.ts";

export class MessageMapper {
    public static fromDto(dto: MessageDto): Message {
        return {
            user: UserMapper.fromDto(dto.user),
            date: new Date(dto.time),
            content: dto.content,
        };
    }
}
