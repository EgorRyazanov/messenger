import { Block } from "../../utils/block.ts";
import { chatTemplate } from "./chat.tmpl.ts";
import messageSettings from "../../assets/icons/message-settings.svg";
import userSettingsIcon from "../../assets/icons/user-settings.svg";
import sendMessage from "../../assets/icons/send-message.svg";
import { ButtonIcon } from "../button/index.ts";
import { Input } from "../input/index.ts";
import { Form } from "../form/index.ts";
import { handleValidateInputs } from "../../utils/validate.ts";
import "./chat.scss";
import { TChat } from "../../utils/constants.ts";

interface IChat {
    activeChat: TChat;
    messageSettingButton: ButtonIcon;
    userSettingButton: ButtonIcon;
}

export class Chat extends Block<IChat> {
    constructor({ activeChat }: { activeChat: TChat }) {
        const props = {
            activeChat,

            messageSettingButton: new ButtonIcon({ img: messageSettings, classNames: "footer__message-setting" }),
            userSettingButton: new ButtonIcon({ img: userSettingsIcon, classNames: "header__user-settings" }),
        };
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    init() {
        const inputs = [
            new Input({
                name: "message",
                labelValue: "",
                isAutofocus: true,
                inputClasses: "footer__message",
                inputContainerClasses: "chat__input-container",
            }),
        ];
        const formEvents = { submit: (e: Event) => this.onSubmit(e, this) };
        this.children.form = new Form({
            inputs,
            classNames: "chat__form",
            events: formEvents,
            button: new ButtonIcon({ img: sendMessage, type: "submit" }),
        });
    }

    onSubmit(e: Event, self: Chat) {
        e.preventDefault();
        let isConfirm = true;
        ((self.children.form as Block).children.inputs as Block[]).forEach((inputContainer) => {
            const inputElement = inputContainer?.getContent()?.querySelector("input");
            const isError = handleValidateInputs(inputElement?.name || "", inputElement?.value || "", self);
            if (isError) {
                isConfirm = false;
            }
        });
        if (isConfirm) {
            const formData = new FormData(e.target as HTMLFormElement);
            const form: Record<string, FormDataEntryValue> = {};
            for (const [key, value] of formData.entries()) {
                form[key] = value;
            }
            console.log(form);
        }
    }

    render() {
        return this.compile(chatTemplate, this.props);
    }
}
