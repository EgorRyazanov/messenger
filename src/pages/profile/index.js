import Handlebars from "handlebars";
import { profileTemplate } from "./profile.tmpl";
import { Input } from "../../components/input";
import "./profile.scss";
import { Link } from "../../components/link";
import { Button, ButtonIcon } from "../../components/button";
import backIcon from "../../assets/icons/back.svg";

export const Profile = (profile, url) => {
    const pathname = window.location.pathname;
    const params = {
        isProfile: pathname === "/profile",
        isProfileEdit: pathname === "/profile/edit",
        isProfileChangePassword: pathname === "/profile/change-password",
    };
    return Handlebars.compile(profileTemplate)({
        url,
        profile,
        inputLogin: Input({ name: "login", labelValue: "Логин", isDisabled: params.isProfile, value: profile.login }),
        inputEmail: Input({ name: "email", labelValue: "Почта", isDisabled: params.isProfile, value: profile.email, type: "email" }),
        inputName: Input({ name: "first_name", labelValue: "Имя", isDisabled: params.isProfile, value: profile.name }),
        inputSecondName: Input({ name: "second_name", labelValue: "Фамилия", isDisabled: params.isProfile, value: profile.secondName }),
        inputDisplayName: Input({ name: "display_name", labelValue: "Имя в чате", isDisabled: params.isProfile, value: profile.displayName }),
        inputPhone: Input({ name: "phone", labelValue: "Телефон", isDisabled: params.isProfile, value: profile.phone, inputClasses: "input--last" }),
        linkEdit: Link({ text: "Изменить данные?", url: "/profile/edit" }),
        linkPassword: Link({ text: "Изменить пароль?", url: "/profile/change-password" }),
        linkExit: Link({ text: "Выйти?", url: "/", linkClasses: "profile__link--exit" }),
        Button: Button({ text: "Сохранить", url: "/profile", classNames: "profile__submit" }),
        params,
        inputOldPassword: Input({ name: "oldPassword", labelValue: "Старый пароль", type: "password" }),
        inputNewPassword: Input({ name: "newPassword", labelValue: "Новый пароль", type: "password" }),
        inputRecoverPassword: Input({
            name: "recoverPassword",
            labelValue: "Повторите новый пароль",
            inputClasses: "input--last",
            type: "password",
        }),
        backButton: ButtonIcon({ url, img: backIcon }),
    });
};
