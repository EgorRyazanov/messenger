import { Block } from "../../utils/block.ts";
import { chatTemplate } from "./chat.tmpl.ts";
import messageSettings from "../../assets/icons/message-settings.svg";
import userSettingsIcon from "../../assets/icons/user-settings.svg";
import sendMessage from "../../assets/icons/send-message.svg";
import { ButtonIconComponent } from "../button/index.ts";
import { InputComponent } from "../input/index.ts";
import { FormComponent } from "../form/index.ts";
import { Chat } from "../../core/models/chat.ts";
import "./chat.scss";

interface ChatProps {
    activeChat: Chat;
    messageSettingButton: ButtonIconComponent;
    userSettingButton: ButtonIconComponent;
}

export class ChatComponent extends Block<ChatProps> {
    public constructor({ activeChat }: { activeChat: Chat }) {
        const props = {
            activeChat,

            messageSettingButton: new ButtonIconComponent({ img: messageSettings, classNames: "footer__message-setting" }),
            userSettingButton: new ButtonIconComponent({ img: userSettingsIcon, classNames: "header__user-settings" }),
        };
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

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
    }

    private handleValidateForm = (): void => {
        if (this.children.form != null && this.children.form instanceof FormComponent) {
            this.children.form.validateInputs();
        }
    };

    private isChatFormValid = (): boolean => {
        if (this.children.form != null && this.children.form instanceof FormComponent) {
            return this.children.form.isFormValid();
        }

        return false;
    };

    private onSubmit(e: Event) {
        e.preventDefault();
        if (e.target != null && e.target instanceof HTMLFormElement) {
            const formData = new FormData(e.target as HTMLFormElement);
            const form: Record<string, FormDataEntryValue> = {};
            for (const [key, value] of formData.entries()) {
                form[key] = value;
            }

            this.handleValidateForm();

            if (this.isChatFormValid()) {
                // Нужно сбрасывать значение в инпуте, посмотреть как сделать ref.
                console.log("Успех");
            }
        }
    }

    protected render() {
        return this.compile(chatTemplate, this.props);
    }
}
