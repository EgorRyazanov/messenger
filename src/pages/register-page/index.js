import { registerPageTemplate } from "./register-page.tmpl";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Link } from "../../components/link";
import { Block } from "../../utils/block";
import { Form } from "../../components/form";
import { handleValidateInputs } from "../../utils/validate";

export class Register extends Block {
    constructor(props = {}) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleValidateInputs = handleValidateInputs;
    }

    init() {
        const inputs = [
            new Input({ name: "email", labelValue: "Почта *", type: "email", isAutofocus: true }),
            new Input({ name: "login", labelValue: "Логин *" }),
            new Input({ name: "first_name", labelValue: "Имя *" }),
            new Input({ name: "second_name", labelValue: "Фамилия *" }),
            new Input({ name: "phone", labelValue: "Телефон *" }),
            new Input({ name: "password", labelValue: "Пароль *", type: "password" }),
            new Input({ name: "repeat_password", labelValue: "Пароль (ещё раз) *", inputContainerClasses: "input--last", type: "password" }),
        ];
        const formEvents = { submit: (e) => this.onSubmit(e, this), focusout: (e) => this.handleValidateInputs(e.target.name, e.target.value, this) };
        this.children.form = new Form({
            inputs,
            events: formEvents,
            link: new Link({ text: "Войти", url: "/login" }),
            title: "Регистрация",
            button: new Button({ text: "Зарегистрироваться", url: "/" }),
        });
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
            window.location.href = "/";
        }
    }

    render() {
        return this.compile(registerPageTemplate, this.props);
    }
}
