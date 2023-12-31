import { profileTemplate } from "./profile.tmpl.ts";
import { InputComponent } from "../../../components/input/index.ts";
import { LinkComponent } from "../../../components/link/index.ts";
import { ButtonComponent, ButtonIconComponent } from "../../../components/button/index.ts";
import { Block } from "../../../utils/block.ts";
import { validateEmail, validateLogin, validateNames, validatePhone } from "../../../utils/validate.ts";
import { FormComponent } from "../../../components/form/index.ts";
import backIcon from "../../../assets/icons/back.svg";
import { withUser } from "../../../utils/with-store.ts";
import AuthController from "../../../controllers/auth-controller.ts";
import { AvatarComponent } from "../../../components/avatar/index.ts";
import { Routes } from "../../../index.ts";
import { BASE_IMAGE_URL } from "../../../utils/constants.ts";
import "../profile.scss";

class ProfileComponent extends Block {
    protected init(): void {
        const inputs = [
            new InputComponent({
                name: "login",
                labelValue: "Логин",
                isDisabled: true,
                value: this.props.login,
                validate: validateLogin,
            }),
            new InputComponent({
                name: "email",
                labelValue: "Почта",
                isDisabled: true,
                value: this.props.email,
                type: "email",
                validate: validateEmail,
            }),
            new InputComponent({
                name: "first_name",
                labelValue: "Имя",
                isDisabled: true,
                value: this.props.firstName,
                validate: validateNames,
            }),
            new InputComponent({
                name: "second_name",
                labelValue: "Фамилия",
                isDisabled: true,
                value: this.props.secondName,
                validate: validateNames,
            }),
            new InputComponent({
                name: "display_name",
                labelValue: "Имя в чате",
                isDisabled: true,
                value: this.props.displayName,
            }),
            new InputComponent({
                name: "phone",
                labelValue: "Телефон",
                isDisabled: true,
                value: this.props.phone,
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
            avatar: new AvatarComponent({
                id: "file",
                isActive: false,
                avatar: this.props.avatar ? `${BASE_IMAGE_URL}${this.props.avatar}` : null,
                inputContainerClasses: "profile__avatar",
            }),
            backButton: new ButtonIconComponent({ url: Routes.Main, img: backIcon, type: "submit" }),
            linkEdit: new LinkComponent({ text: "Изменить данные?", url: Routes.ProfileEdit }),
            linkPassword: new LinkComponent({ text: "Изменить пароль?", url: Routes.ProfileChangePassword }),
            linkExit: new LinkComponent({
                events: {
                    click: async (event: Event) => {
                        event.preventDefault();
                        await AuthController.logout();
                    },
                },
                text: "Выйти?",
                linkClasses: "profile__link--exit",
            }),
        };
    }

    protected render(): DocumentFragment {
        return this.compile(profileTemplate, this.props);
    }
}

export const ProfilePage = withUser(ProfileComponent);
