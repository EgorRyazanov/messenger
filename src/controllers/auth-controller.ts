import API, { AuthAPI } from "../api/auth.ts";
import { LoginDto } from "../core/DTO/auth/login.dto.ts";
import { RegistrationDto } from "../core/DTO/auth/registration.dto.ts";
import { ServerError, isServerError } from "../core/DTO/server-error.dto.ts";
import { ErrorMapper } from "../core/mappers/error.mapper.ts";
import { CustomError } from "../core/models/error.ts";
import { Routes } from "../index.ts";
import { router } from "../utils/router.ts";
import { store } from "../utils/store.ts";

export class AuthController {
    private readonly api: AuthAPI;

    public constructor() {
        this.api = API;
    }

    public async login(data: LoginDto) {
        try {
            await this.api.login(data);

            await this.fetchUser();

            router.go(Routes.Profile);
        } catch (e: unknown) {
            if (isServerError(e)) {
                throw ErrorMapper.fromDto(e);
            }
        }
    }

    public async register(data: RegistrationDto) {
        try {
            await this.api.register(data);

            await this.fetchUser();

            router.go(Routes.Profile);
        } catch (e: unknown) {
            if (isServerError(e)) {
                throw ErrorMapper.fromDto(e);
            }
        }
    }

    public async fetchUser() {
        const user = await this.api.read();

        store.set("user", user);
    }

    // async logout() {
    //     try {
    //         MessagesController.closeAll();

    //         await this.api.logout();

    //         router.go("/");
    //     } catch (e: any) {
    //         console.error(e.message);
    //     }
    // }
}

export default new AuthController();
