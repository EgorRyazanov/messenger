import { LoginDto } from "../../DTO/auth/login.dto.ts";
import { Login } from "../../models/auth/login.ts";

export class LoginMapper {
    public static toDto(model: Login): LoginDto {
        return {
            login: model.login,
            password: model.password,
        };
    }
}
