import { mainPageTemplate } from "./main-page.tmpl";
import { ChatsList } from "../../components/chats-list";
import { Chat } from "../../components/chat";
import { Block } from "../../utils/block";

export class Main extends Block {
    constructor({ chats, activeChat }) {
        super({
            chatsLists: new ChatsList({ chats }),
            activeChat: new Chat({ activeChat }),
        });
    }

    render() {
        return this.compile(mainPageTemplate, this.props);
    }
}
