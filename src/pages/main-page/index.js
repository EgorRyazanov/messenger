import Handlebars from "handlebars";
import { mainPageTemplate } from "./main-page.tmpl";
import { ChatsList } from "../../components/chats-list";
import { Chat } from "../../components/chat";

export const Main = (chats, activeChat) => {
    return Handlebars.compile(mainPageTemplate)({ chatsLists: ChatsList(chats), activeChat: Chat(activeChat) });
};
