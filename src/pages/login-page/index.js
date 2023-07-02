import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { loginPageTemplate } from "./login-page.tmpl";
import { Link } from "../../components/link";
import { Block } from "../../utils/block";
import { Form } from "../../components/form";
import { handleValidateInputs } from "../../utils/validate";

export class Login extends Block {
    constructor(props = {}) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleValidateInputs = handleValidateInputs.bind(this);
    }

    init() {
        const inputs = [
            new Input({ name: "login", labelValue: "Логин", isAutofocus: true }),
            new Input({
                name: "password",
                labelValue: "Пароль",
                inputContainerClasses: "input--last",
                type: "password",
            }),
        ];
        const formEvents = {
            submit: (e) => this.onSubmit(e, this),
            focusout: (e) => this.handleValidateInputs(e.target.name, e.target.value, this),
        };
        this.children.form = new Form({
            inputs,
            events: formEvents,
            link: new Link({ text: "Нет аккаунта?", url: "/register" }),
            title: "Вход",
            button: new Button({ text: "Войти", type: "submit" }),
        });
    }

    onSubmit(e, self) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const form = {};
        for (const [key, value] of formData.entries()) {
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
            window.location.href = "/";
            self.removeEvents();
        }
    }

    render() {
        return this.compile(loginPageTemplate, this.props);
    }
}
