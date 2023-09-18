import { Block } from "../../utils/block.ts";
import { Chats } from "../../utils/constants.ts";
import { chatsListTemplate } from "./chats-list.tmpl.ts";

interface ChatsListProps {
    chats: Chats;
}

export class ChatsListComponent extends Block<ChatsListProps> {
    public constructor({ chats }: ChatsListProps) {
        super({ chats });
    }

    protected render() {
        return this.compile(chatsListTemplate, this.props);
    }
}
