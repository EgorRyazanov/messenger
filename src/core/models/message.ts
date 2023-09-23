import { User } from "./user.ts";

export interface Message {
    user: User | null;
    content: string;
    date: Date;
}
