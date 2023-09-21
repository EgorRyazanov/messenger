import { UserDto } from "./user.dto.ts";

export interface MessageDto {
    user: UserDto;
    time: string;
    content: string;
}
