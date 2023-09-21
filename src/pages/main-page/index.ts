import { mainPageTemplate } from "./main-page.tmpl.ts";
import { ChatsListComponent } from "../../components/chats-list/index.ts";
import { ChatComponent } from "../../components/chat/index.ts";
import { Block } from "../../utils/block.ts";
import { Chat } from "../../core/models/chat.ts";

interface MainProps {
    chatsLists: ChatsListComponent;
    activeChat: ChatComponent;
}

export class MainPage extends Block<MainProps> {
    public constructor({ chats, activeChat }: { chats: Chat[]; activeChat: Chat }) {
        super({
            chatsLists: new ChatsListComponent({ chats }),
            activeChat: new ChatComponent({ activeChat }),
        });
    }

    protected render() {
        return this.compile(mainPageTemplate, this.props);
    }
}
