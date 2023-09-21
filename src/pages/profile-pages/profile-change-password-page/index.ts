import { profileTemplate } from "./profile-change-password-page.tmlp.ts";
import { InputComponent } from "../../../components/input/index.ts";
import { ButtonComponent, ButtonIconComponent } from "../../../components/button/index.ts";
import { Block } from "../../../utils/block.ts";
import { FormComponent } from "../../../components/form/index.ts";
import { User } from "../../../utils/constants.ts";
import { validatePassword } from "../../../utils/validate.ts";
import backIcon from "../../../assets/icons/back.svg";
import "../profile.scss";

interface ProfileChangePasswordProps {
    profile: User;
}

export class ProfileChangePasswordPage extends Block<ProfileChangePasswordProps> {
    public constructor(props: ProfileChangePasswordProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    protected init() {
        const inputs = [
            new InputComponent({ name: "old_password", labelValue: "Старый пароль", type: "password", validate: validatePassword }),
            new InputComponent({ name: "password", labelValue: "Новый пароль", type: "password", validate: validatePassword }),
            new InputComponent({
                name: "repeat_password",
                labelValue: "Повторите новый пароль",
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
