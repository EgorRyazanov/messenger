import { Block } from "../../utils/block.ts";
import { messagesContainerTemplate } from "./messages-container.tmpl.ts";
import { Message } from "../../core/models/message.ts";
import "./messages-container.scss";

interface MessagesContainerComponentProps {
    messages: Message[];
    id: string;
    events?: Record<string, (event: Event) => void>;
}

export class MessagesContainerComponent extends Block<MessagesContainerComponentProps> {
    protected render(): DocumentFragment {
        return this.compile(messagesContainerTemplate, this.props);
    }
}
