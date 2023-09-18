import { profileTemplate } from "./profile.tmpl.ts";
import { InputComponent } from "../../components/input/index.ts";
import { LinkComponent } from "../../components/link/index.ts";
import { ButtonComponent, ButtonIconComponent } from "../../components/button/index.ts";
import { Block } from "../../utils/block.ts";
import { validateEmail, validateLogin, validateNames, validatePassword, validatePhone } from "../../utils/validate.ts";
import { FormComponent } from "../../components/form/index.ts";
import { TProfile } from "../../utils/constants.ts";
import backIcon from "../../assets/icons/back.svg";
import "./profile.scss";

interface ProfileProps {
    params: {
        isProfile: boolean;
        isProfileEdit: boolean;
        isProfileChangePassword: boolean;
    };
    profile: TProfile;
    url: string;
}

export class ProfilePage extends Block<ProfileProps> {
    public constructor({ profile, url }: Omit<ProfileProps, "params">) {
        const { pathname } = window.location;
        const params = {
            isProfile: pathname === "/profile",
            isProfileEdit: pathname === "/profile/edit",
            isProfileChangePassword: pathname === "/profile/change-password",
        };
        super({
            url,
            profile,
            params,
        });
        this.onSubmit = this.onSubmit.bind(this);
    }

    protected init() {
        const inputs = !this.props.params.isProfileChangePassword
            ? [
                  new InputComponent({
                      name: "login",
                      labelValue: "Логин",
                      isDisabled: this.props.params.isProfile,
                      value: this.props.profile.login,
                      validate: validateLogin,
                  }),
                  new InputComponent({
                      name: "email",
                      labelValue: "Почта",
                      isDisabled: this.props.params.isProfile,
                      value: this.props.profile.email,
                      type: "email",
                      validate: validateEmail,
                  }),
                  new InputComponent({
                      name: "first_name",
                      labelValue: "Имя",
                      isDisabled: this.props.params.isProfile,
                      value: this.props.profile.name,
                      validate: validateNames,
                  }),
                  new InputComponent({
                      name: "second_name",
                      labelValue: "Фамилия",
                      isDisabled: this.props.params.isProfile,
                      value: this.props.profile.secondName,
                      validate: validateNames,
                  }),
                  new InputComponent({
                      name: "display_name",
                      labelValue: "Имя в чате",
                      isDisabled: this.props.params.isProfile,
                      value: this.props.profile.displayName,
                  }),
                  new InputComponent({
                      name: "phone",
                      labelValue: "Телефон",
                      isDisabled: this.props.params.isProfile,
                      value: this.props.profile.phone,
                      inputContainerClasses: "input--last",
                      validate: validatePhone,
                  }),
              ]
            : [
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
                classNames: this.props.params.isProfile ? "profile__button--hidden" : "",
            }),
        });

        this.children = {
            form,
            backButton: new ButtonIconComponent({ url: "/", img: backIcon, type: "submit" }),
            linkEdit: new LinkComponent({ text: "Изменить данные?", url: "/profile/edit" }),
            linkPassword: new LinkComponent({ text: "Изменить пароль?", url: "/profile/change-password" }),
            linkExit: new LinkComponent({ text: "Выйти?", url: "/", linkClasses: "profile__link--exit" }),
        };
    }

    private handleValidateForm = (): void => {
        if (this.children.form != null && this.children.form instanceof FormComponent) {
            this.children.form.validateInputs();
        }
    };

    private isProfileFormValid = (): boolean => {
        if (this.children.form != null && this.children.form instanceof FormComponent) {
            console.log(this.children.form.isFormValid());
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
