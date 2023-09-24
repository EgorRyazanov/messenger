export interface ServerError {
    reason: string;
}

export function isServerError(error: unknown): error is ServerError {
    if (error instanceof Object && "reason" in error) {
        return true;
    }
    return false;
}
