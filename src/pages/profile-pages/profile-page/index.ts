import { profileTemplate } from "./profile.tmpl.ts";
import { InputComponent } from "../../../components/input/index.ts";
import { LinkComponent } from "../../../components/link/index.ts";
import { ButtonComponent, ButtonIconComponent } from "../../../components/button/index.ts";
import { Block } from "../../../utils/block.ts";
import { validateEmail, validateLogin, validateNames, validatePhone } from "../../../utils/validate.ts";
import { FormComponent } from "../../../components/form/index.ts";
import { User } from "../../../utils/constants.ts";
import backIcon from "../../../assets/icons/back.svg";
import "../profile.scss";

interface ProfileProps {
    profile: User;
}

export class ProfilePage extends Block<ProfileProps> {
    protected init() {
        const inputs = [
            new InputComponent({
                name: "login",
                labelValue: "Логин",
                isDisabled: true,
                value: this.props.profile.login,
                validate: validateLogin,
            }),
            new InputComponent({
                name: "email",
                labelValue: "Почта",
                isDisabled: true,
                value: this.props.profile.email,
                type: "email",
                validate: validateEmail,
            }),
            new InputComponent({
                name: "first_name",
                labelValue: "Имя",
                isDisabled: true,
                value: this.props.profile.name,
                validate: validateNames,
            }),
            new InputComponent({
                name: "second_name",
                labelValue: "Фамилия",
                isDisabled: true,
                value: this.props.profile.secondName,
                validate: validateNames,
            }),
            new InputComponent({
                name: "display_name",
                labelValue: "Имя в чате",
                isDisabled: true,
                value: this.props.profile.displayName,
            }),
            new InputComponent({
                name: "phone",
                labelValue: "Телефон",
                isDisabled: true,
                value: this.props.profile.phone,
                inputContainerClasses: "input--last",
                validate: validatePhone,
            }),
        ];

        const form = new FormComponent({
            inputs,
            classNames: "profile__form",
            button: new ButtonComponent({
                text: "Сохранить",
                type: "submit",
                classNames: "profile__button--hidden",
            }),
        });

        this.children = {
            form,
            backButton: new ButtonIconComponent({ url: "/", img: backIcon, type: "submit" }),
            linkEdit: new LinkComponent({ text: "Изменить данные?", url: "/profile/edit" }),
            linkPassword: new LinkComponent({ text: "Изменить пароль?", url: "/profile/change-password" }),
            linkExit: new LinkComponent({ text: "Выйти?", url: "/", linkClasses: "profile__link--exit" }),
        };
    }

    protected render() {
        return this.compile(profileTemplate, this.props);
    }
}
