import { ButtonComponent } from "../../components/button/index.ts";
import { InputComponent } from "../../components/input/index.ts";
import { loginPageTemplate } from "./login-page.tmpl.ts";
import { LinkComponent } from "../../components/link/index.ts";
import { Block } from "../../utils/block.ts";
import { FormComponent } from "../../components/form/index.ts";
import { validateLogin, validatePassword } from "../../utils/validate.ts";
import { LoginDto } from "../../core/DTO/auth/login.dto.ts";
import AuthController from "../../controllers/auth-controller.ts";
import { CustomError } from "../../core/models/error.ts";

export class LoginPage extends Block {
    public constructor(props = {}) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    protected init(): void {
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

    private async onSubmit(e: Event): Promise<void> {
        e.preventDefault();
        if (e.target != null && e.target instanceof HTMLFormElement) {
            if (this.children.form instanceof FormComponent) {
                const { form } = this.children;
                form.validateInputs();
                form.props.error = "";
                const values = form.getValues<LoginDto>();

                if (form.isFormValid() && values != null) {
                    try {
                        await AuthController.login(values);
                    } catch (event: unknown) {
                        if (event instanceof CustomError) {
                            form.props.error = event.reason;
                        }
                    }
                }
            }
        }
    }

    protected render(): DocumentFragment {
        return this.compile(loginPageTemplate, this.props);
    }
}
