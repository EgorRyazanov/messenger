import { mainPageTemplate } from "./main-page.tmpl.ts";
import { ChatsListComponent } from "../../components/chats-list/index.ts";
import { ChatComponent } from "../../components/chat/index.ts";
import { Block } from "../../utils/block.ts";
import { Chat } from "../../core/models/chat.ts";
import chatController from "../../controllers/chat-controller.ts";

export class MainPage extends Block {
    public constructor() {
        super({});
        chatController.fetchChats();
    }

    protected init() {
        this.children.chatsLists = new ChatsListComponent({});
    }

    protected render() {
        return this.compile(mainPageTemplate, this.props);
    }
}
