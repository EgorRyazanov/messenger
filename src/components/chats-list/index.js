import Handlebars from "handlebars";

import { chatsListTemplate } from "./chats-list.tmpl";

export const ChatsList = (chats) => {
    return Handlebars.compile(chatsListTemplate)({ chats });
};
