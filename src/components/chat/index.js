import { Block } from "../../utils/block";
import { chatTemplate } from "./chat.tmpl";
import messageSettings from "../../assets/icons/message-settings.svg";
import userSettingsIcon from "../../assets/icons/user-settings.svg";
import sendMessage from "../../assets/icons/send-message.svg";
import { ButtonIcon } from "../button";
import "./chat.scss";

export class Chat extends Block {
    constructor({ activeChat }) {
        const props = {
            activeChat,
            sendButton: new ButtonIcon({ img: sendMessage }),
            messageSettingButton: new ButtonIcon({ img: messageSettings, classNames: "footer__message-setting" }),
            userSettingButton: new ButtonIcon({ img: userSettingsIcon, classNames: "header__user-settings" }),
        };
        super(props);
    }

    render() {
        return this.compile(chatTemplate, this.props);
    }
}
