import { Block } from "../../utils/block.ts";
import { chatTemplate } from "./chat.tmpl.ts";
import messageSettings from "../../assets/icons/message-settings.svg";
import userSettingsIcon from "../../assets/icons/user-settings.svg";
import sendMessage from "../../assets/icons/send-message.svg";
import { ButtonIconComponent } from "../button/index.ts";
import { InputComponent } from "../input/index.ts";
import { FormComponent } from "../form/index.ts";
import { withChats, withMessages, withSelectedChat } from "../../utils/with-store.ts";
import { Chat as ChatType } from "../../core/models/chat.ts";
import { AvatarComponent } from "../avatar/index.ts";
import messagesController from "../../controllers/messages-controller.ts";
import { MessagesContainerComponent } from "../messages-container/index.ts";
import { isEqual } from "../../utils/helpers.ts";
import "./chat.scss";

class Chat extends Block {
    protected init() {
        const inputs = [
            new InputComponent({
                name: "message",
                labelValue: "",
                isAutofocus: true,
                inputClasses: "footer__message",
                inputContainerClasses: "chat__input-container",
                validate: (message) => {
                    if (!message) {
                        return "";
                    }

                    return null;
                },
            }),
        ];
        const formEvents = { submit: (e: Event) => this.onSubmit(e) };
        this.children.form = new FormComponent({
            inputs,
            classNames: "chat__form",
            events: formEvents,
            button: new ButtonIconComponent({ img: sendMessage, type: "submit" }),
        });
        this.children.messageSettingButton = new ButtonIconComponent({ img: messageSettings, classNames: "footer__message-setting" });
        this.children.userSettingButton = new ButtonIconComponent({ img: userSettingsIcon, classNames: "header__user-settings" });
    }

    private onSubmit(e: Event) {
        e.preventDefault();
        if (e.target != null && e.target instanceof HTMLFormElement) {
            if (this.children.form instanceof FormComponent) {
                const { form } = this.children;

                form.validateInputs();
                const values = form.getValues<{ message: string }>();

                if (form.isFormValid() && values != null) {
                    messagesController.sendMessage(this.props.selectedChat, values.message);
                    form.clearForm();
                }
            }
        }
    }

    protected componentDidUpdate(_oldProps: any, _newProps: any): boolean {
        if (isEqual(_oldProps, _newProps)) {
            if (_newProps.selectedChat != null) {
                if (isEqual(_oldProps.messages[this.props.selectedChat], _newProps.messages[this.props.selectedChat])) {
                    this.children.messagesContainer = new MessagesContainerComponent({
                        messages: this.props.messages[this.props.selectedChat],
                        id: "messages",
                    });
                    setTimeout(() => {
                        const messagesContainer = document.getElementById("messages");
                        if (messagesContainer != null) {
                            messagesContainer.scrollTop = messagesContainer.scrollHeight;
                        }
                    }, 0);
                }
            }

            return true;
        }
        return false;
    }

    protected render() {
        const activeChat = (this.props.chats as ChatType[]).find((chat) => chat.id === this.props.selectedChat);
        if (activeChat != null) {
            this.children.avatar = new AvatarComponent({
                id: "chatAvatar",
                isActive: false,
                inputContainerClasses: "header__image",
                avatar: activeChat.avatar != null ? `https://ya-praktikum.tech/api/v2/resources${activeChat.avatar}` : null,
            });
        }

        return this.compile(chatTemplate, {
            ...this.props,
            activeChat,
        });
    }
}

export const ChatComponent = withChats(withMessages(withSelectedChat(Chat)));
