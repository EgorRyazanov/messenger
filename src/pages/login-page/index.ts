import { Button } from "../../components/button/index.ts";
import { Input } from "../../components/input/index.ts";
import { loginPageTemplate } from "./login-page.tmpl.ts";
import { Link } from "../../components/link/index.ts";
import { Block } from "../../utils/block.ts";
import { Form } from "../../components/form/index.ts";
import { handleValidateInputs } from "../../utils/validate.ts";

export class Login extends Block {
    constructor(props = {}) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
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
            submit: (e: Event) => this.onSubmit(e, this),
            focusout: (e: Event) => handleValidateInputs((e.target as HTMLInputElement).name, (e.target as HTMLInputElement).value, this),
        };
        this.children.form = new Form({
            inputs,
            events: formEvents,
            link: new Link({ text: "Нет аккаунта?", url: "/register" }),
            title: "Вход",
            button: new Button({ text: "Войти", type: "submit" }),
        });
    }

    onSubmit(e: Event, self: Login) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const form: Record<string, FormDataEntryValue> = {};
        for (const [key, value] of formData.entries()) {
            form[key] = value;
        }
        console.log(form);
        let isConfirm = true;
        ((self.children.form as Block).children.inputs as Block[]).forEach((inputContainer) => {
            const inputElement = inputContainer?.getContent()?.querySelector("input");
            const isError = handleValidateInputs(inputElement?.name || "", inputElement?.value || "", self);
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
