import { Chat } from "../../core/models/chat.ts";
import { Block } from "../../utils/block.ts";
import { withSelectedChat } from "../../utils/with-store.ts";
import { AvatarComponent } from "../avatar/index.ts";
import { chatsListItemTemplate } from "./chat-list-item.tmpl.ts";

interface ChatsListItemProps {
    chat: Chat;
    selectedChat: Chat["id"];
}

class ChatsListItem extends Block<ChatsListItemProps> {
    protected init() {
        this.children.avatar = new AvatarComponent({
            id: this.props.chat.id.toString(),
            isActive: false,
            avatar: this.props.chat.avatar ? `https://ya-praktikum.tech/api/v2/resources${this.props.chat.avatar}` : null,
            inputContainerClasses: "chat__avatar",
        });
    }

    protected render() {
        return this.compile(chatsListItemTemplate, {
            ...this.props,
            chatSelectedClassname: this.props.selectedChat === this.props.chat.id ? "chat__item_active" : "",
        });
    }
}

export const ChatsListItemComponent = withSelectedChat(ChatsListItem);