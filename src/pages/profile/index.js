import { profileTemplate } from "./profile.tmpl";
import { Input } from "../../components/input";
import "./profile.scss";
import { Link } from "../../components/link";
import { Button, ButtonIcon } from "../../components/button";
import backIcon from "../../assets/icons/back.svg";
import { Block } from "../../utils/block";
import { handleValidateInputs } from "../../utils/validate";
import { Form } from "../../components/form";

export class Profile extends Block {
    constructor({ profile, url }) {
        const pathname = window.location.pathname;
        const params = {
            isProfile: pathname === "/profile",
            isProfileEdit: pathname === "/profile/edit",
            isProfileChangePassword: pathname === "/profile/change-password",
        };
        super({
            url,
            profile,
            params,
        });
        this.onSubmit = this.onSubmit.bind(this);
        this.handleValidateInputs = handleValidateInputs;
    }

    init() {
        const inputs = !this.props.params.isProfileChangePassword
            ? [
                  new Input({ name: "login", labelValue: "Логин", isDisabled: this.props.params.isProfile, value: this.props.profile.login }),
                  new Input({ name: "email", labelValue: "Почта", isDisabled: this.props.params.isProfile, value: this.props.profile.email, type: "email" }),
                  new Input({ name: "first_name", labelValue: "Имя", isDisabled: this.props.params.isProfile, value: this.props.profile.name }),
                  new Input({ name: "second_name", labelValue: "Фамилия", isDisabled: this.props.params.isProfile, value: this.props.profile.secondName }),
                  new Input({ name: "display_name", labelValue: "Имя в чате", isDisabled: this.props.params.isProfile, value: this.props.profile.displayName }),
                  new Input({
                      name: "phone",
                      labelValue: "Телефон",
                      isDisabled: this.props.params.isProfile,
                      value: this.props.profile.phone,
                      inputContainerClasses: "input--last",
                  }),
              ]
            : [
                  new Input({ name: "old_password", labelValue: "Старый пароль", type: "password" }),
                  new Input({ name: "password", labelValue: "Новый пароль", type: "password" }),
                  new Input({
                      name: "repeat_password",
                      labelValue: "Повторите новый пароль",
                      inputContainerClasses: "input--last",
                      type: "password",
                  }),
              ];

        const formEvents = { submit: (e) => this.onSubmit(e, this), focusout: (e) => this.handleValidateInputs(e.target.name, e.target.value, this) };
        const form = new Form({
            inputs,
            events: formEvents,
            classNames: "profile__form",
            button: new Button({ text: "Сохранить", type: "submit", classNames: this.props.params.isProfile ? "profile__button--hidden" : "" }),
        });
        this.children = {
            form,
            backButton: new ButtonIcon({ url: "/", img: backIcon, type: "submit" }),
            linkEdit: new Link({ text: "Изменить данные?", url: "/profile/edit" }),
            linkPassword: new Link({ text: "Изменить пароль?", url: "/profile/change-password" }),
            linkExit: new Link({ text: "Выйти?", url: "/", linkClasses: "profile__link--exit" }),
        };
    }

    onSubmit(e, self) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const form = {};
        for (let [key, value] of formData.entries()) {
            form[key] = value;
        }
        console.log(form);
        let isConfirm = true;
        self.children.form.children.inputs.forEach((inputContainer) => {
            const inputElement = inputContainer.getContent().querySelector("input");
            const isError = this.handleValidateInputs(inputElement.name, inputElement.value, self);
            if (isError) {
                isConfirm = false;
            }
        });

        if (isConfirm) {
            window.location.href = "/profile";
        }
    }

    render() {
        return this.compile(profileTemplate, this.props);
    }
}
