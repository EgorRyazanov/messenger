import { User } from "../models/user.ts";
import { UserDto } from "../DTO/user.dto.ts";

export class UserMapper {
    public static fromDto(dto: UserDto): User {
        return {
            id: dto.id,
            secondName: dto.second_name,
            displayName: dto.display_name,
            firstName: dto.first_name,
            login: dto.login,
            avatar: dto.avatar,
            email: dto.email,
            phone: dto.phone,
        };
    }
}
