import { ButtonComponent } from "../../components/button/index.ts";
import { InputComponent } from "../../components/input/index.ts";
import { loginPageTemplate } from "./login-page.tmpl.ts";
import { LinkComponent } from "../../components/link/index.ts";
import { Block } from "../../utils/block.ts";
import { FormComponent } from "../../components/form/index.ts";
import { validateLogin, validatePassword } from "../../utils/validate.ts";

export class LoginPage extends Block {
    public constructor(props = {}) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    protected init() {
        const inputs = [
            new InputComponent({ name: "login", labelValue: "Логин", isAutofocus: true, validate: validateLogin }),
            new InputComponent({
                name: "password",
                labelValue: "Пароль",
                inputContainerClasses: "input--last",
                type: "password",
                validate: validatePassword,
            }),
        ];

        const formEvents = {
            submit: (e: Event) => this.onSubmit(e),
        };

        this.children.form = new FormComponent({
            inputs,
            events: formEvents,
            link: new LinkComponent({ text: "Нет аккаунта?", url: "/register" }),
            title: "Вход",
            button: new ButtonComponent({ text: "Войти", type: "submit" }),
        });
    }

    private handleValidateForm = (): void => {
        if (this.children.form != null && this.children.form instanceof FormComponent) {
            this.children.form.validateInputs();
        }
    };

    private isLoginFormValid = (): boolean => {
        if (this.children.form != null && this.children.form instanceof FormComponent) {
            return this.children.form.isFormValid();
        }

        return false;
    };

    private onSubmit(e: Event) {
        e.preventDefault();
        if (e.target != null && e.target instanceof HTMLFormElement) {
            const formData = new FormData(e.target);
            const form: Record<string, FormDataEntryValue> = {};
            for (const [key, value] of formData.entries()) {
                form[key] = value;
            }
            this.handleValidateForm();

            if (this.isLoginFormValid()) {
                window.location.href = "/";
                this.removeEvents();
            }
        }
    }

    protected render() {
        return this.compile(loginPageTemplate, this.props);
    }
}
