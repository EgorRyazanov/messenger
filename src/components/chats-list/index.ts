import chatController from "../../controllers/chat-controller.ts";
import { Chat } from "../../core/models/chat.ts";
import { Block } from "../../utils/block.ts";
import { SEARCH_INTERVAL_TIME_MS } from "../../utils/constants.ts";
import { withChats } from "../../utils/with-store.ts";
import { ButtonComponent } from "../button/button.ts";
import { ChatsListItemComponent } from "../chat-list-item/index.ts";
import { SearchComponent } from "../search/index.ts";
import { chatsListTemplate } from "./chats-list.tmpl.ts";
import { ModalComponent } from "../modal/index.ts";
import { FormComponent } from "../form/index.ts";
import { InputComponent } from "../input/index.ts";
import { CustomError } from "../../core/models/error.ts";
import "./chats-list.scss";

let interval: NodeJS.Timeout;

class ChatsList extends Block {
    protected init() {
        const inputs = [new InputComponent({ name: "title", labelValue: "Название", isAutofocus: true })];
        const form = new FormComponent({
            inputs,
            events: {
                submit: this.onModalSubmit.bind(this),
            },
            title: "Создание чата",
            button: new ButtonComponent({ text: "Создать", type: "submit" }),
            classNames: "chats-list__form",
        });

        this.children.Modal = new ModalComponent({ container: "#app", form });

        this.children.AddChatButton = new ButtonComponent({
            text: "Добавить",
            classNames: "chats-list__add-chat",
            events: {
                click: () => {
                    const modal = new ModalComponent({ container: "#app", form });
                    this.children.Modal = modal;
                    modal.createPortal();
                },
            },
        });

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

    private async onModalSubmit(e: Event) {
        e.preventDefault();
        if (e.target != null && e.target instanceof HTMLFormElement) {
            if (this.children.Modal instanceof ModalComponent && this.children.Modal.children.form instanceof FormComponent) {
                const { form } = this.children.Modal.children;
                form.validateInputs();
                form.props.error = "";
                const values = form.getValues<{ title: string }>();

                if (form.isFormValid() && values != null) {
                    try {
                        await chatController.create(values.title);
                        this.children.Modal.closeModal();
                    } catch (event: unknown) {
                        if (event instanceof CustomError) {
                            form.props.error = event.reason;
                        }
                    }
                }
            }
        }
    }

    protected render() {
        this.children.chatItems = (this.props.chats as Chat[]).map((chat) => {
            return new ChatsListItemComponent({ chat });
        });
        return this.compile(chatsListTemplate, this.props);
    }
}

export const ChatsListComponent = withChats(ChatsList);
