import { LoginDto } from "../core/DTO/auth/login.dto.ts";
import { RegistrationDto } from "../core/DTO/auth/registration.dto.ts";
import { UserDto } from "../core/DTO/user.dto.ts";
import { BaseAPI } from "./base.ts";

export class AuthAPI extends BaseAPI {
    public constructor() {
        super("/auth");
    }

    public register(data: RegistrationDto): Promise<Pick<UserDto, "id">> {
        return this.http.post<Pick<UserDto, "id">>("/signup", { data });
    }

    public login(data: LoginDto): Promise<void> {
        return this.http.post<void>("/signin", { data });
    }

    public async read() {
        return this.http.get<UserDto>("/user");
    }

    public logout() {
        return this.http.post<void>("/logout");
    }

    create = undefined;

    update = undefined;

    delete = undefined;
}

export default new AuthAPI();
