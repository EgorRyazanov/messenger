import Handlebars from "handlebars";

import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { loginPageTemplate } from "./login-page.tmpl";
import { Link } from "../../components/link";

export const Login = () =>
    Handlebars.compile(loginPageTemplate)({
        button: Button({ text: "Войти", url: "/" }),
        inputLogin: Input({ name: "login", labelValue: "Логин" }),
        inputPassword: Input({ name: "password", labelValue: "Пароль", inputClasses: "input--last", type: "password" }),
        link: Link({ text: "Нет аккаунта?", url: "/register" }),
    });
