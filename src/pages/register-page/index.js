import Handlebars from "handlebars";

import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Link } from "../../components/link";
import { registerPageTemplate } from "./register-page.tmpl";

export const Register = () =>
    Handlebars.compile(registerPageTemplate)({
        button: Button({ text: "Зарегистрироваться", url: "/" }),
        inputEmail: Input({ name: "email", labelValue: "Почта *", type: "email" }),
        inputLogin: Input({ name: "login", labelValue: "Логин *" }),
        inputName: Input({ name: "first_name", labelValue: "Имя *" }),
        inputSecondName: Input({ name: "second_name", labelValue: "Фамилия *" }),
        inputPhone: Input({ name: "phone", labelValue: "Телефон *" }),
        inputPassword: Input({ name: "password", labelValue: "Пароль *", type: "password" }),
        inputRepeatPassword: Input({ name: "repeatPassword", labelValue: "Пароль (ещё раз) *", inputClasses: "input--last", type: "password" }),
        link: Link({ text: "Войти", url: "/login" }),
    });
