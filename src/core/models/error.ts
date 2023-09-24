export class CustomError extends Error {
    public readonly reason: string;

    public constructor(message: string) {
        super();
        this.reason = message;
    }
}
