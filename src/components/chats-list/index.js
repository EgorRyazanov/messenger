import { Block } from "../../utils/block";
import { chatsListTemplate } from "./chats-list.tmpl";

export class ChatsList extends Block {
    constructor({ chats }) {
        super({ chats });
    }

    render() {
        return this.compile(chatsListTemplate, this.props);
    }
}
