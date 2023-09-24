import API, { UserAPI } from "../api/user.ts";
import { isServerError } from "../core/DTO/server-error.dto.ts";
import { UserDto } from "../core/DTO/user.dto.ts";
import { ErrorMapper } from "../core/mappers/error.mapper.ts";
import { UserMapper } from "../core/mappers/user.mapper.ts";
import { User } from "../core/models/user.ts";
import { Routes } from "../index.ts";
import { router } from "../utils/router.ts";
import { store } from "../utils/store.ts";

export interface PasswordUpdate {
    oldPassword: string;
    newPassword: string;
}

export class UserController {
    private readonly api: UserAPI;

    public constructor() {
        this.api = API;
    }

    public async update(data: UserDto): Promise<void> {
        try {
            const userDto = await this.api.update(data);

            store.set("user", UserMapper.fromDto(userDto));

            router.go(Routes.Profile);
        } catch (e: unknown) {
            if (isServerError(e)) {
                throw ErrorMapper.fromDto(e);
            }
        }
    }

    public async updatePassword(data: PasswordUpdate): Promise<void> {
        try {
            await this.api.updatePassword(data);

            router.go(Routes.Profile);
        } catch (e: unknown) {
            if (isServerError(e)) {
                throw ErrorMapper.fromDto(e);
            }
        }
    }

    public async searchUser(data: { login: string }): Promise<User[] | null> {
        try {
            const usersDto = await this.api.searchUser(data);
            const users = usersDto.map((userDto) => UserMapper.fromDto(userDto));
            return users;
        } catch (e: unknown) {
            if (isServerError(e)) {
                throw ErrorMapper.fromDto(e);
            }
        }

        return null;
    }

    public async updateAvatar(data: File): Promise<void> {
        try {
            const userDto = await this.api.updateAvatar(data);

            store.set("user", UserMapper.fromDto(userDto));
        } catch (e: unknown) {
            if (isServerError(e)) {
                throw ErrorMapper.fromDto(e);
            }
        }
    }
}

export default new UserController();
