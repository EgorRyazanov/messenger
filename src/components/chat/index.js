import { Block } from "../../utils/block";
import { chatTemplate } from "./chat.tmpl";
import messageSettings from "../../assets/icons/message-settings.svg";
import userSettingsIcon from "../../assets/icons/user-settings.svg";
import sendMessage from "../../assets/icons/send-message.svg";
import { ButtonIcon } from "../button";
import { Input } from "../input";
import { Form } from "../form";
import { handleValidateInputs } from "../../utils/validate";
import "./chat.scss";

export class Chat extends Block {
    constructor({ activeChat }) {
        const props = {
            activeChat,

            messageSettingButton: new ButtonIcon({ img: messageSettings, classNames: "footer__message-setting" }),
            userSettingButton: new ButtonIcon({ img: userSettingsIcon, classNames: "header__user-settings" }),
        };
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleValidateInputs = handleValidateInputs;
    }

    init() {
        const inputs = [
            new Input({
                name: "message",
                isAutofocus: true,
                inputClasses: "footer__message",
                inputContainerClasses: "chat__input-container",
            }),
        ];
        const formEvents = { submit: (e) => this.onSubmit(e, this) };
        this.children.form = new Form({
            inputs,
            classNames: "chat__form",
            events: formEvents,
            button: new ButtonIcon({ img: sendMessage, type: "submit" }),
        });
    }

    onSubmit(e, self) {
        e.preventDefault();
        let isConfirm = true;
        self.children.form.children.inputs.forEach((inputContainer) => {
            const inputElement = inputContainer.getContent().querySelector("input");
            const isError = this.handleValidateInputs(inputElement.name, inputElement.value, self);
            if (isError) {
                isConfirm = false;
            }
        });
        if (isConfirm) {
            const formData = new FormData(e.target);
            const form = {};
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
