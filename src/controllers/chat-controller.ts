import API, { ChatsAPI } from "../api/chats.ts";
import { isServerError } from "../core/DTO/server-error.dto.ts";
import { ChatMapper } from "../core/mappers/chat.mapper.ts";
import { ErrorMapper } from "../core/mappers/error.mapper.ts";
import { store } from "../utils/store.ts";

class ChatsController {
    private readonly api: ChatsAPI;

    public constructor() {
        this.api = API;
    }

    public async create(title: string) {
        try {
            await this.api.create({ title });

            this.fetchChats();
        } catch (e: unknown) {
            if (isServerError(e)) {
                throw ErrorMapper.fromDto(e);
            }
        }
    }

    public async fetchChats(title?: string) {
        const data = title != null ? { title } : undefined;
        const chatsDto = await this.api.read(data);

        // chats.map(async (chat) => {
        //     const token = await this.getToken(chat.id);

        //     // await MessagesController.connect(chat.id, token);
        // });
        store.set(
            "chats",
            chatsDto.map((chatDto) => ChatMapper.fromDto(chatDto)),
        );
    }

    public addUserToChat(id: number, userId: number) {
        this.api.addUsers(id, [userId]);
    }

    public async delete(id: number) {
        await this.api.delete(id);

        this.fetchChats();
    }

    public getToken(id: number) {
        return this.api.getToken(id);
    }

    public selectChat(id: number) {
        store.set("selectedChat", id);
    }
}

export default new ChatsController();
