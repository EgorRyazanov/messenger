import Handlebars from "handlebars";
import { chatTemplate } from "./chat.tmpl";
import messageSettings from "../../assets/icons/message-settings.svg";
import userSettingsIcon from "../../assets/icons/user-settings.svg";
import "./chat.scss";

import sendMessage from "../../assets/icons/send-message.svg";

import { ButtonIcon } from "../button";

export const Chat = (activeChat) => {
    return Handlebars.compile(chatTemplate)({
        activeChat,
        sendButton: ButtonIcon({ img: sendMessage }),
        messageSettingButton: ButtonIcon({ img: messageSettings, classNames: "footer__message-setting" }),
        userSettingButton: ButtonIcon({ img: userSettingsIcon, classNames: "header__user-settings" }),
    });
};
