import { ServerError } from "../DTO/server-error.dto.ts";
import { CustomError } from "../models/error.ts";

export class ErrorMapper {
    public static fromDto(error: ServerError): CustomError {
        return new CustomError(error.reason);
    }
}
