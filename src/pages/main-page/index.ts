import { mainPageTemplate } from "./main-page.tmpl.ts";
import { ChatsList } from "../../components/chats-list/index.ts";
import { Chat } from "../../components/chat/index.ts";
import { Block } from "../../utils/block.ts";
import { TChat, TChats } from "../../utils/constants.ts";

interface IMain {
    chatsLists: ChatsList;
    activeChat: Chat;
}

export class Main extends Block<IMain> {
    constructor({ chats, activeChat }: { chats: TChats; activeChat: TChat }) {
        super({
            chatsLists: new ChatsList({ chats }),
            activeChat: new Chat({ activeChat }),
        });
    }

    render() {
        return this.compile(mainPageTemplate, this.props);
    }
}
