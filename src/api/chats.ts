import { BaseAPI } from "./base.ts";
import { User } from "../core/models/user.ts";
import { ChatDto } from "../core/DTO/chat.dto.ts";
import { Chat } from "../core/models/chat.ts";

export class ChatsAPI extends BaseAPI {
    public constructor() {
        super("/chats");
    }

    public create(data: { title: string }): Promise<ChatDto> {
        return this.http.post<ChatDto>("/", { data });
    }

    public delete(identifier: Chat["id"]): Promise<unknown> {
        return this.http.delete("/", { data: { chatId: identifier } });
    }

    public read(data?: { title: string }): Promise<ChatDto[]> {
        return this.http.get("/", { data });
    }

    public getUsers(id: number): Promise<User[]> {
        return this.http.get(`/${id}/users`);
    }

    public addUsers(id: number, users: User["id"][]): Promise<unknown> {
        return this.http.put("/users", { data: { users, chatId: id } });
    }

    public async getToken(id: number): Promise<string> {
        const response = await this.http.post<{ token: string }>(`/token/${id}`);

        return response.token;
    }

    public updateAvatar(data: FormData) {
        return this.http.put<ChatDto>("/avatar", { data });
    }

    update = undefined;
}

export default new ChatsAPI();
