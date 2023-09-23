import chatController from "../../controllers/chat-controller.ts";
import { Chat } from "../../core/models/chat.ts";
import { Block } from "../../utils/block.ts";
import { SEARCH_INTERVAL_TIME_MS } from "../../utils/constants.ts";
import { withChats } from "../../utils/with-store.ts";
import { ChatsListItemComponent } from "../chat-list-item/index.ts";
import { SearchComponent } from "../search/index.ts";
import { chatsListTemplate } from "./chats-list.tmpl.ts";

let interval: NodeJS.Timeout;

class ChatsList extends Block {
    protected init() {
        this.children.SearchComponent = new SearchComponent({
            events: {
                keyup: (event: Event) => {
                    if (event.target != null) {
                        const input = event.target as HTMLInputElement;
                        clearInterval(interval);
                        interval = setTimeout(async () => {
                            await chatController.fetchChats(input.value);
                        }, SEARCH_INTERVAL_TIME_MS);
                    }
                },
            },
        });
    }

    protected render() {
        this.children.chatItems = (this.props.chats as Chat[]).map((chat) => {
            return new ChatsListItemComponent({ chat });
        });
        return this.compile(chatsListTemplate, this.props);
    }
}

export const ChatsListComponent = withChats(ChatsList);
