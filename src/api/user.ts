import { PasswordUpdate } from "../controllers/user-controller.ts";
import { UserDto } from "../core/DTO/user.dto.ts";
import { BaseAPI } from "./base.ts";

export class UserAPI extends BaseAPI {
    public constructor() {
        super("/user");
    }

    public update(data: UserDto) {
        return this.http.put<UserDto>("/profile", { data });
    }

    public updatePassword(data: PasswordUpdate) {
        return this.http.put<UserDto>("/password", { data });
    }

    public updateAvatar(data: File) {
        return this.http.put<UserDto>("/profile/avatar", { data });
    }

    read = undefined;

    create = undefined;

    delete = undefined;
}

export default new UserAPI();
