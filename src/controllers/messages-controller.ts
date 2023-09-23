import { MessageDto } from "../core/DTO/message.dto.ts";
import { MessageMapper } from "../core/mappers/message.mapper.ts";
import { Chat } from "../core/models/chat.ts";
import { Message } from "../core/models/message.ts";
import { store } from "../utils/store.ts";
import WSTransport, { WSTransportEvents } from "../utils/websocket-transport.ts";

class MessagesController {
    private sockets: Map<number, WSTransport> = new Map();

    public async connect(id: Chat["id"], token: string) {
        if (this.sockets.has(id)) {
            return;
        }

        const userId = store.getState().user?.id;

        if (userId == null) {
            return;
        }

        const wsTransport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);

        this.sockets.set(id, wsTransport);

        await wsTransport.connect();

        this.subscribe(wsTransport, id);
        this.fetchOldMessages(id);
    }

    public sendMessage(id: Chat["id"], message: string) {
        const socket = this.sockets.get(id);

        if (!socket) {
            throw new Error(`Chat ${id} is not connected`);
        }

        socket.send({
            type: "message",
            content: message,
        });
    }

    public fetchOldMessages(id: Chat["id"], content = 0) {
        const socket = this.sockets.get(id);

        if (!socket) {
            throw new Error(`Chat ${id} is not connected`);
        }

        socket.send({ type: "get old", content: `${content}` });
    }

    public closeAll() {
        Array.from(this.sockets.values()).forEach((socket) => socket.close());
    }

    private onMessage(id: Chat["id"], messagesDto: MessageDto | MessageDto[]) {
        let messagesToAdd: Message[] = [];

        if (Array.isArray(messagesDto)) {
            messagesToAdd = messagesDto.map((messageDto) => MessageMapper.fromDto(messageDto)).reverse();
        } else {
            messagesToAdd.push(MessageMapper.fromDto(messagesDto));
        }

        const currentMessages = (store.getState().messages || {})[id] || [];

        messagesToAdd = [...currentMessages, ...messagesToAdd];

        store.set(`messages.${id}`, messagesToAdd);
    }

    private onClose(id: number) {
        this.sockets.delete(id);
    }

    private subscribe(transport: WSTransport, id: Chat["id"]) {
        transport.on(WSTransportEvents.Message, (message) => this.onMessage(id, message));
        transport.on(WSTransportEvents.Close, () => this.onClose(id));
    }
}

export default new MessagesController();
