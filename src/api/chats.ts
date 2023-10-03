import { BaseAPI } from "./base.ts";
import { User } from "../core/models/user.ts";
import { ChatDto } from "../core/DTO/chat.dto.ts";
import { Chat } from "../core/models/chat.ts";
import { UserDto } from "../core/DTO/user.dto.ts";

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

    public async getUsers(id: Chat["id"]): Promise<UserDto[]> {
        return this.http.get(`/${id}/users`);
    }

    public addUsers(id: Chat["id"], users: User["id"][]): Promise<unknown> {
        return this.http.put("/users", { data: { users, chatId: id } });
    }

    public deleteUsers(id: Chat["id"], users: User["id"][]): Promise<unknown> {
        return this.http.delete("/users", { data: { users, chatId: id } });
    }

    public async getToken(id: Chat["id"]): Promise<string> {
        const response = await this.http.post<{ token: string }>(`/token/${id}`);

        return response.token;
    }

    public updateAvatar(data: FormData) {
        return this.http.put<ChatDto>("/avatar", { data });
    }

    update = undefined;
}

export default new ChatsAPI();
