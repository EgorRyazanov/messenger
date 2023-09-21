import { Chat } from "../../core/models/chat.ts";
import { Block } from "../../utils/block.ts";
import { chatsListTemplate } from "./chats-list.tmpl.ts";

interface ChatsListProps {
    chats: Chat[];
}

export class ChatsListComponent extends Block<ChatsListProps> {
    public constructor({ chats }: ChatsListProps) {
        super({ chats });
    }

    protected render() {
        return this.compile(chatsListTemplate, this.props);
    }
}
