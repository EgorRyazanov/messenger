import { profileTemplate } from "./profile-change-password-page.tmlp.ts";
import { InputComponent } from "../../../components/input/index.ts";
import { ButtonComponent, ButtonIconComponent } from "../../../components/button/index.ts";
import { Block } from "../../../utils/block.ts";
import { FormComponent } from "../../../components/form/index.ts";
import { validatePassword } from "../../../utils/validate.ts";
import { withUser } from "../../../utils/with-store.ts";
import backIcon from "../../../assets/icons/back.svg";
import userController, { PasswordUpdate } from "../../../controllers/user-controller.ts";
import { CustomError } from "../../../core/models/error.ts";
import { AvatarComponent } from "../../../components/avatar/index.ts";
import "../profile.scss";

export class ProfileChangePasswordComponent extends Block {
    protected init() {
        const inputs = [
            new InputComponent({ name: "oldPassword", labelValue: "Старый пароль", type: "password", validate: validatePassword }),
            new InputComponent({ name: "newPassword", labelValue: "Новый пароль", type: "password", validate: validatePassword }),
            new InputComponent({
                name: "repeat_password",
                labelValue: "Повторите новый пароль",
                inputContainerClasses: "input--last",
                type: "password",
                validate: (value: string) => {
                    const { form } = this.children;
                    if (form instanceof FormComponent) {
                        const password = (form.children.inputs as InputComponent[]).find((input) => input.props.name === "newPassword");
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
            avatar: new AvatarComponent({
                id: "file",
                isActive: false,
                avatar: this.props.avatar ? `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}` : null,
                inputContainerClasses: "profile__avatar",
            }),
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

    private async onSubmit(e: Event) {
        e.preventDefault();
        if (e.target != null && e.target instanceof HTMLFormElement) {
            const form = this.children.form as FormComponent;
            form.props.error = "";
            const values = form.getValues<PasswordUpdate>();

            this.handleValidateForm();

            if (this.isProfileFormValid() && values != null) {
                try {
                    await userController.updatePassword(values);
                } catch (event: unknown) {
                    if (event instanceof CustomError) {
                        form.props.error = event.reason;
                    }
                }
            }
        }
    }

    protected render() {
        return this.compile(profileTemplate, this.props);
    }
}

export const ProfileChangePasswordPage = withUser(ProfileChangePasswordComponent);
