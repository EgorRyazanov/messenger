import { PasswordUpdate } from "../controllers/user-controller.ts";
import { UserDto } from "../core/DTO/user.dto.ts";
import { BaseAPI } from "./base.ts";

export class UserAPI extends BaseAPI {
    public constructor() {
        super("/user");
    }

    public update(data: UserDto): Promise<UserDto> {
        return this.http.put<UserDto>("/profile", { data });
    }

    public updatePassword(data: PasswordUpdate): Promise<UserDto> {
        return this.http.put<UserDto>("/password", { data });
    }

    public updateAvatar(data: File): Promise<UserDto> {
        return this.http.put<UserDto>("/profile/avatar", { data });
    }

    public searchUser(data: { login: string }): Promise<UserDto[]> {
        return this.http.post<UserDto[]>("/search", { data });
    }

    read = undefined;

    create = undefined;

    delete = undefined;
}

export default new UserAPI();
