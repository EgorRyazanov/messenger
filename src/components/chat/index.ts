import { Block } from "../../utils/block.ts";
import { chatTemplate } from "./chat.tmpl.ts";
import deleteChatIcon from "../../assets/icons/delete.svg";
import deletePersonIcon from "../../assets/icons/delete-person.svg";
import addPersonIcon from "../../assets/icons/add-person.svg";
import sendMessage from "../../assets/icons/send-message.svg";
import { ButtonComponent, ButtonIconComponent } from "../button/index.ts";
import { InputComponent } from "../input/index.ts";
import { FormComponent } from "../form/index.ts";
import { withChats, withMessages, withSelectedChat } from "../../utils/with-store.ts";
import { Chat as ChatType } from "../../core/models/chat.ts";
import { AvatarComponent } from "../avatar/index.ts";
import messagesController from "../../controllers/messages-controller.ts";
import { MessagesContainerComponent } from "../messages-container/index.ts";
import { isEqual } from "../../utils/helpers.ts";
import { CustomError } from "../../core/models/error.ts";
import chatController from "../../controllers/chat-controller.ts";
import { ModalComponent } from "../modal/index.ts";
import { router } from "../../utils/router.ts";
import { Routes } from "../../index.ts";
import userController from "../../controllers/user-controller.ts";
import { BASE_IMAGE_URL } from "../../utils/constants.ts";
import "./chat.scss";

class Chat extends Block {
    protected init(): void {
        const inputs = [
            new InputComponent({
                name: "message",
                labelValue: "",
                isAutofocus: true,
                inputClasses: "footer__message",
                inputContainerClasses: "chat__input-container",
                validate: (message) => {
                    if (!message || message.trim().length === 0) {
                        return "";
                    }

                    return null;
                },
            }),
        ];
        const formEvents = { submit: (e: Event) => this.onMessageSubmit(e) };
        this.children.form = new FormComponent({
            inputs,
            classNames: "chat__form",
            events: formEvents,
            button: new ButtonIconComponent({ img: sendMessage, type: "submit" }),
        });

        this.children.ChatDeleteModal = new ModalComponent({
            container: "#app",
            form: new FormComponent({
                inputs: [
                    new InputComponent({
                        name: "title",
                        labelValue: "Введите название",
                        isAutofocus: true,
                        validate: (value: string) => {
                            const activeChat = (this.props.chats as ChatType[]).find((chat) => chat.id === this.props.selectedChat);
                            if (activeChat != null && value !== activeChat.title) {
                                return "Название введено неверно";
                            }

                            return null;
                        },
                    }),
                ],
                events: {
                    submit: this.onChatDeleteModalSubmit.bind(this),
                },
                title: "Удаление чата",
                button: new ButtonComponent({ text: "Удалить", type: "submit" }),
                classNames: "chats-list__form",
            }),
        });

        this.children.ChatDeleteButton = new ButtonIconComponent({
            img: deleteChatIcon,
            classNames: "header__icon-button",
            events: {
                click: () => {
                    const { ChatDeleteModal } = this.children;
                    if (ChatDeleteModal instanceof ModalComponent) {
                        ChatDeleteModal.createPortal();
                    }
                },
            },
        });

        this.children.DeletePersonButton = new ButtonIconComponent({
            img: deletePersonIcon,
            classNames: "header__icon-button",
            events: {
                click: () => {
                    const { DeletePersonModal } = this.children;
                    if (DeletePersonModal instanceof ModalComponent) {
                        DeletePersonModal.createPortal();
                    }
                },
            },
        });

        this.children.AddPersonButton = new ButtonIconComponent({
            img: addPersonIcon,
            classNames: "header__icon-button",
            events: {
                click: () => {
                    const { AddPersonModal } = this.children;
                    if (AddPersonModal instanceof ModalComponent) {
                        AddPersonModal.createPortal();
                    }
                },
            },
        });

        this.children.AddPersonModal = new ModalComponent({
            container: "#app",
            form: new FormComponent({
                inputs: [
                    new InputComponent({
                        name: "login",
                        labelValue: "Введите логин",
                        isAutofocus: true,
                    }),
                ],
                events: {
                    submit: this.onAddPersonModalSubmit.bind(this),
                },
                title: "Добавить пользователя",
                button: new ButtonComponent({ text: "Добавить", type: "submit" }),
                classNames: "chats-list__form",
            }),
        });

        this.children.DeletePersonModal = new ModalComponent({
            container: "#app",
            form: new FormComponent({
                inputs: [
                    new InputComponent({
                        name: "login",
                        labelValue: "Введите логин",
                        isAutofocus: true,
                    }),
                ],
                events: {
                    submit: this.onDeletePersonModalSubmit.bind(this),
                },
                title: "Удалить пользователя",
                button: new ButtonComponent({ text: "Удалить", type: "submit" }),
                classNames: "chats-list__form",
            }),
        });
    }

    private onMessageSubmit(e: Event): void {
        e.preventDefault();
        if (e.target != null && e.target instanceof HTMLFormElement) {
            if (this.children.form instanceof FormComponent) {
                const { form } = this.children;

                form.validateInputs();
                const values = form.getValues<{ message: string }>();

                if (form.isFormValid() && values != null && values.message.trim().length > 0) {
                    messagesController.sendMessage(this.props.selectedChat, values.message);
                    form.clearForm();
                }
            }
        }
    }

    private async onChatDeleteModalSubmit(e: Event): Promise<void> {
        e.preventDefault();
        if (e.target != null && e.target instanceof HTMLFormElement) {
            if (
                this.children.ChatDeleteModal instanceof ModalComponent &&
                this.children.ChatDeleteModal.children.form instanceof FormComponent
            ) {
                const { form } = this.children.ChatDeleteModal.children;

                form.validateInputs();

                if (form.isFormValid()) {
                    try {
                        const activeChat = (this.props.chats as ChatType[]).find((chat) => chat.id === this.props.selectedChat);
                        if (activeChat != null) {
                            await chatController.delete(activeChat.id);
                            this.children.ChatDeleteModal.closeModal();
                            router.go(Routes.Main);
                        }
                    } catch (event: unknown) {
                        if (event instanceof CustomError) {
                            form.props.error = event.reason;
                        }
                    }
                }
            }
        }
    }

    private async onAddPersonModalSubmit(e: Event): Promise<void> {
        e.preventDefault();
        if (e.target != null && e.target instanceof HTMLFormElement) {
            if (
                this.children.AddPersonModal instanceof ModalComponent &&
                this.children.AddPersonModal.children.form instanceof FormComponent
            ) {
                const { form } = this.children.AddPersonModal.children;

                const search = form.getValues<{ login: string }>();

                try {
                    const activeChat = (this.props.chats as ChatType[]).find((chat) => chat.id === this.props.selectedChat);

                    if (search != null && activeChat != null) {
                        const users = await userController.searchUser(search);
                        if (users != null && users.length === 1) {
                            await chatController.addUserToChat(activeChat.id, users[0].id);
                            this.children.AddPersonModal.closeModal();
                        } else {
                            form.props.error = "Пользователь не найден";
                        }
                    }
                } catch (event: unknown) {
                    if (event instanceof CustomError) {
                        form.props.error = event.reason;
                    }
                }
            }
        }
    }

    private async onDeletePersonModalSubmit(e: Event): Promise<void> {
        e.preventDefault();
        if (e.target != null && e.target instanceof HTMLFormElement) {
            if (
                this.children.DeletePersonModal instanceof ModalComponent &&
                this.children.DeletePersonModal.children.form instanceof FormComponent
            ) {
                const { form } = this.children.DeletePersonModal.children;

                const search = form.getValues<{ login: string }>();

                try {
                    const activeChat = (this.props.chats as ChatType[]).find((chat) => chat.id === this.props.selectedChat);

                    if (search != null && activeChat != null) {
                        const users = await userController.searchUser(search);
                        if (users != null && users.length === 1) {
                            await chatController.deleteUserToChat(activeChat.id, users[0].id);
                            this.children.DeletePersonModal.closeModal();
                        } else {
                            form.props.error = "Пользователь не найден";
                        }
                    }
                } catch (event: unknown) {
                    if (event instanceof CustomError) {
                        form.props.error = event.reason;
                    }
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

    protected render(): DocumentFragment {
        const activeChat = (this.props.chats as ChatType[]).find((chat) => chat.id === this.props.selectedChat);
        if (activeChat != null) {
            this.children.avatar = new AvatarComponent({
                id: "chatAvatar",
                isActive: true,
                inputContainerClasses: "header__image",
                events: {
                    click: async () => {
                        const inputComponent = document.getElementById("chatAvatar") as HTMLInputElement;
                        inputComponent?.click();
                        inputComponent?.addEventListener("change", async () => {
                            const files = inputComponent?.files;
                            if (files != null) {
                                try {
                                    const newAvatar = await chatController.updateAvatar(files[0], activeChat.id);
                                    const avatar = this.children.avatar as Block;

                                    avatar.setProps({
                                        ...avatar.props,
                                        avatar: newAvatar ? `${BASE_IMAGE_URL}${newAvatar}` : null,
                                    });
                                } catch (e: unknown) {
                                    if (e instanceof CustomError) {
                                        console.error(e.reason);
                                    }
                                }
                            }
                        });
                    },
                },
                avatar: activeChat.avatar != null ? `${BASE_IMAGE_URL}${activeChat.avatar}` : null,
            });
        }

        return this.compile(chatTemplate, {
            ...this.props,
            activeChat,
        });
    }
}

export const ChatComponent = withChats(withMessages(withSelectedChat(Chat)));
