import { Block } from "../../utils/block.ts";
import { TChats } from "../../utils/constants.ts";
import { chatsListTemplate } from "./chats-list.tmpl.ts";

interface IChatsList {
    chats: TChats;
}

export class ChatsList extends Block<IChatsList> {
    constructor({ chats }: IChatsList) {
        super({ chats });
    }

    render() {
        return this.compile(chatsListTemplate, this.props);
    }
}
