import { RegistrationDto } from "../../DTO/auth/registration.dto.ts";
import { Registration } from "../../models/auth/registration.ts";

export class RegistrationMapper {
    public static toDto(model: Registration): RegistrationDto {
        return {
            first_name: model.firstName,
            second_name: model.secondName,
            login: model.login,
            email: model.email,
            password: model.password,
            phone: model.phone,
        };
    }
}
