import { profileTemplate } from "./profile-edit-page.tmpl.ts";
import { InputComponent } from "../../../components/input/index.ts";
import { ButtonComponent, ButtonIconComponent } from "../../../components/button/index.ts";
import { Block } from "../../../utils/block.ts";
import { validateEmail, validateLogin, validateNames, validatePhone } from "../../../utils/validate.ts";
import { FormComponent } from "../../../components/form/index.ts";
import backIcon from "../../../assets/icons/back.svg";
import { withUser } from "../../../utils/with-store.ts";
import UserController from "../../../controllers/user-controller.ts";
import { UserDto } from "../../../core/DTO/user.dto.ts";
import { CustomError } from "../../../core/models/error.ts";
import { AvatarComponent } from "../../../components/avatar/index.ts";
import "../profile.scss";

export class ProfileEditComponent extends Block {
    protected init() {
        const inputs = [
            new InputComponent({
                name: "login",
                labelValue: "Логин",
                value: this.props.login,
                validate: validateLogin,
            }),
            new InputComponent({
                name: "email",
                labelValue: "Почта",
                value: this.props.email,
                type: "email",
                validate: validateEmail,
            }),
            new InputComponent({
                name: "first_name",
                labelValue: "Имя",
                value: this.props.firstName,
                validate: validateNames,
            }),
            new InputComponent({
                name: "second_name",
                labelValue: "Фамилия",
                value: this.props.secondName,
                validate: validateNames,
            }),
            new InputComponent({
                name: "display_name",
                labelValue: "Имя в чате",
                value: this.props.displayName,
            }),
            new InputComponent({
                name: "phone",
                labelValue: "Телефон",
                value: this.props.phone,
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
            avatar: new AvatarComponent({
                id: "file",
                isActive: true,
                avatar: this.props.avatar ? `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}` : null,
                inputContainerClasses: "profile__avatar",
                events: {
                    click: async () => {
                        const inputComponent = document.getElementById("file") as HTMLInputElement;
                        inputComponent?.click();
                        form.props.error = "";
                        inputComponent?.addEventListener("change", async () => {
                            const files = inputComponent?.files;
                            if (files != null) {
                                try {
                                    await UserController.updateAvatar(files[0]);
                                    const avatar = this.children.avatar as Block;
                                    avatar.setProps({
                                        ...avatar.props,
                                        avatar: this.props.avatar ? `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}` : null,
                                    });
                                } catch (e: unknown) {
                                    if (e instanceof CustomError) {
                                        form.props.error = e.reason;
                                    }
                                }
                            }
                        });
                    },
                },
            }),
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
            const values = form.getValues<UserDto>();

            this.handleValidateForm();

            if (this.isProfileFormValid() && values != null) {
                try {
                    await UserController.update(values);
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

export const ProfileEditPage = withUser(ProfileEditComponent);
