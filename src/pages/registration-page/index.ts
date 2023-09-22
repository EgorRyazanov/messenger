import { registerPageTemplate } from "./registration-page.tmpl.ts";
import { ButtonComponent } from "../../components/button/index.ts";
import { InputComponent } from "../../components/input/index.ts";
import { LinkComponent } from "../../components/link/index.ts";
import { Block } from "../../utils/block.ts";
import { FormComponent } from "../../components/form/index.ts";
import { validateEmail, validateLogin, validateNames, validatePassword, validatePhone } from "../../utils/validate.ts";
import { RegistrationDto } from "../../core/DTO/auth/registration.dto.ts";
import { CustomError } from "../../core/models/error.ts";
import AuthController from "../../controllers/auth-controller.ts";

export class RegistrationPage extends Block {
    public constructor(props = {}) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    protected init() {
        const inputs = [
            new InputComponent({
                name: "email",
                labelValue: "Почта *",
                type: "email",
                isAutofocus: true,
                validate: validateEmail,
            }),
            new InputComponent({ name: "login", labelValue: "Логин *", validate: validateLogin }),
            new InputComponent({ name: "first_name", labelValue: "Имя *", validate: validateNames }),
            new InputComponent({ name: "second_name", labelValue: "Фамилия *", validate: validateNames }),
            new InputComponent({ name: "phone", labelValue: "Телефон *", validate: validatePhone }),
            new InputComponent({ name: "password", labelValue: "Пароль *", type: "password", validate: validatePassword }),
            new InputComponent({
                name: "repeat_password",
                labelValue: "Пароль (ещё раз) *",
                inputContainerClasses: "input--last",
                type: "password",
                validate: (value: string) => {
                    const { form } = this.children;
                    if (form instanceof FormComponent) {
                        const password = (form.children.inputs as InputComponent[]).find((input) => input.props.name === "password");
                        if (password?.value === value) {
                            return null;
                        }
                    }

                    return "Пароли не совпадают";
                },
            }),
        ];
        const formEvents = {
            submit: (e: Event) => this.onSubmit(e),
        };

        this.children.form = new FormComponent({
            inputs,
            events: formEvents,
            link: new LinkComponent({ text: "Войти", url: "/login" }),
            title: "Регистрация",
            button: new ButtonComponent({ text: "Зарегистрироваться", type: "submit" }),
        });
    }

    private handleValidateForm = (): void => {
        if (this.children.form != null && this.children.form instanceof FormComponent) {
            this.children.form.validateInputs();
        }
    };

    private isRegistrationFormValid = (): boolean => {
        if (this.children.form != null && this.children.form instanceof FormComponent) {
            return this.children.form.isFormValid();
        }

        return false;
    };

    private async onSubmit(e: Event) {
        e.preventDefault();
        if (e.target != null && e.target instanceof HTMLFormElement) {
            const form = this.children.form as FormComponent;
            form.props.error = "";

            this.handleValidateForm();
            const values = form.getValues<RegistrationDto>();

            if (this.isRegistrationFormValid() && values != null) {
                try {
                    await AuthController.register(values);
                } catch (event: unknown) {
                    if (event instanceof CustomError) {
                        form.props.error = event.reason;
                    }
                }
            }
        }
    }

    protected render() {
        return this.compile(registerPageTemplate, this.props);
    }
}
