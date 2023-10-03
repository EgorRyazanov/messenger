import API, { ChatsAPI } from "../api/chats.ts";
import { isServerError } from "../core/DTO/server-error.dto.ts";
import { ChatMapper } from "../core/mappers/chat.mapper.ts";
import { ErrorMapper } from "../core/mappers/error.mapper.ts";
import { UserMapper } from "../core/mappers/user.mapper.ts";
import { Chat } from "../core/models/chat.ts";
import { User } from "../core/models/user.ts";
import { store } from "../utils/store.ts";
import messagesController from "./messages-controller.ts";

class ChatsController {
    private readonly api: ChatsAPI;

    public constructor() {
        this.api = API;
    }

    public async create(title: string): Promise<void> {
        try {
            await this.api.create({ title });

            this.fetchChats();
        } catch (e: unknown) {
            if (isServerError(e)) {
                throw ErrorMapper.fromDto(e);
            }
        }
    }

    public async fetchChats(title?: string): Promise<void> {
        const data = title != null ? { title } : undefined;
        const chatsDto = await this.api.read(data);
        const chats = chatsDto.map((chatDto) => ChatMapper.fromDto(chatDto));
        chats.map(async (chat) => {
            const token = await this.getToken(chat.id);

            await messagesController.connect(chat.id, token);
        });

        store.set("chats", chats);
    }

    public async updateAvatar(data: File, chatId: Chat["id"]): Promise<Chat["avatar"] | null> {
        try {
            const formData = new FormData();
            formData.append("avatar", data);
            formData.append("chatId", chatId.toString());
            const chatDto = await this.api.updateAvatar(formData);

            const { chats } = store.getState();

            const chat = ChatMapper.fromDto(chatDto);

            const updatedChats = chats.map((currentChat) => {
                if (currentChat.id === chat.id) {
                    return chat;
                }
                return currentChat;
            });

            store.set("chats", updatedChats);

            return chat.avatar;
        } catch (e: unknown) {
            if (isServerError(e)) {
                throw ErrorMapper.fromDto(e);
            }
        }

        return null;
    }

    public async addUserToChat(id: Chat["id"], userId: User["id"]): Promise<void> {
        this.api.addUsers(id, [userId]);
    }

    public async deleteUserToChat(id: Chat["id"], userId: User["id"]): Promise<void> {
        this.api.deleteUsers(id, [userId]);
    }

    public async delete(id: Chat["id"]): Promise<void> {
        await this.api.delete(id);

        this.fetchChats();
    }

    public async getChatUsers(id: Chat["id"]): Promise<User[]> {
        const usersDto = await this.api.getUsers(id);
        return usersDto.map((userDto) => UserMapper.fromDto(userDto));
    }

    public getToken(id: Chat["id"]): Promise<string> {
        return this.api.getToken(id);
    }

    public selectChat(id: Chat["id"]) {
        store.set("selectedChat", id);
    }
}

export default new ChatsController();
