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
import { BASE_IMAGE_URL } from "../../../utils/constants.ts";
import { Routes } from "../../../index.ts";
import "../profile.scss";

export class ProfileEditComponent extends Block {
    protected init(): void {
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
            backButton: new ButtonIconComponent({ url: Routes.Profile, img: backIcon, type: "submit" }),
            avatar: new AvatarComponent({
                id: "file",
                isActive: true,
                avatar: this.props.avatar ? `${BASE_IMAGE_URL}${this.props.avatar}` : null,
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
                                        avatar: this.props.avatar ? `${BASE_IMAGE_URL}${this.props.avatar}` : null,
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

    private async onSubmit(e: Event): Promise<void> {
        e.preventDefault();
        if (e.target != null && e.target instanceof HTMLFormElement) {
            if (this.children.form instanceof FormComponent) {
                const { form } = this.children;
                form.props.error = "";
                const values = form.getValues<UserDto>();

                form.validateInputs();

                if (form.isFormValid() && values != null) {
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
    }

    protected render(): DocumentFragment {
        return this.compile(profileTemplate, this.props);
    }
}

export const ProfileEditPage = withUser(ProfileEditComponent);
