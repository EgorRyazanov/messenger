import { User } from "./user.ts";

export interface Message {
    user: User;
    content: string;
    date: Date;
}
