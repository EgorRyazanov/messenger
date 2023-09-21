import { profileTemplate } from "./profile-edit-page.tmpl.ts";
import { InputComponent } from "../../../components/input/index.ts";
import { ButtonComponent, ButtonIconComponent } from "../../../components/button/index.ts";
import { Block } from "../../../utils/block.ts";
import { validateEmail, validateLogin, validateNames, validatePhone } from "../../../utils/validate.ts";
import { FormComponent } from "../../../components/form/index.ts";
import { User } from "../../../utils/constants.ts";
import backIcon from "../../../assets/icons/back.svg";
import "../profile.scss";

interface ProfileEditProps {
    profile: User;
}

export class ProfileEditPage extends Block<ProfileEditProps> {
    public constructor(props: ProfileEditProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    protected init() {
        const inputs = [
            new InputComponent({
                name: "login",
                labelValue: "Логин",
                value: this.props.profile.login,
                validate: validateLogin,
            }),
            new InputComponent({
                name: "email",
                labelValue: "Почта",
                value: this.props.profile.email,
                type: "email",
                validate: validateEmail,
            }),
            new InputComponent({
                name: "first_name",
                labelValue: "Имя",
                value: this.props.profile.name,
                validate: validateNames,
            }),
            new InputComponent({
                name: "second_name",
                labelValue: "Фамилия",
                value: this.props.profile.secondName,
                validate: validateNames,
            }),
            new InputComponent({
                name: "display_name",
                labelValue: "Имя в чате",
                value: this.props.profile.displayName,
            }),
            new InputComponent({
                name: "phone",
                labelValue: "Телефон",
                value: this.props.profile.phone,
                inputContainerClasses: "input--last",
                validate: validatePhone,
            }),
        ];

        const formEvents = {
            submit: (e: Event) => this.onSubmit(e),
        };

        const form = new FormComponent({
            inputs,
            events: formEvents,
            classNames: "profile__form",
            button: new ButtonComponent({
                text: "Сохранить",
                type: "submit",
            }),
        });

        this.children = {
            form,
            backButton: new ButtonIconComponent({ url: "/profile", img: backIcon, type: "submit" }),
        };
    }

    private handleValidateForm = (): void => {
        if (this.children.form != null && this.children.form instanceof FormComponent) {
            this.children.form.validateInputs();
        }
    };

    private isProfileFormValid = (): boolean => {
        if (this.children.form != null && this.children.form instanceof FormComponent) {
            return this.children.form.isFormValid();
        }

        return false;
    };

    private onSubmit(e: Event) {
        e.preventDefault();
        if (e.target != null && e.target instanceof HTMLFormElement) {
            const formData = new FormData(e.target as HTMLFormElement);
            const form: Record<string, FormDataEntryValue> = {};
            for (const [key, value] of formData.entries()) {
                form[key] = value;
            }

            this.handleValidateForm();

            if (this.isProfileFormValid()) {
                window.location.href = "/profile";
                this.removeEvents();
            }
        }
    }

    protected render() {
        return this.compile(profileTemplate, this.props);
    }
}
