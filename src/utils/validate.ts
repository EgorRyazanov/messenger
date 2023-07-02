import { Block } from "./block.ts";

export const validateLogin = (login: string): boolean => {
    if (login) {
        return login.length >= 3 && login.length <= 20 && /^[a-zA-Z0-9-_]+$/.test(login) && !/^\d+$/.test(login);
    }

    return false;
};

export const validatePassword = (password: string): boolean => {
    if (password) {
        return (
            password.length >= 8 &&
            password.length <= 40 &&
            /[0-9]+/.test(password) &&
            /[A-Z]+/.test(password) &&
            /^[a-zA-Z0-9]+$/.test(password)
        );
    }

    return false;
};

export const validateEmail = (email: string): boolean => {
    if (email) {
        return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
    }

    return false;
};

export const validateNames = (name: string): boolean => {
    if (name) {
        return /^[a-zA-Zа-яА-ЯёЁ-]+$/.test(name) && name[0] === name[0].toUpperCase();
    }

    return false;
};

export const validatePhone = (phone: string): boolean => {
    if (phone) {
        const countPlusSymbols = phone.split("+").length;
        return phone.length <= 15 && /^[0-9+]+$/.test(phone) && ((countPlusSymbols === 2 && phone[0] === "+") || countPlusSymbols === 1);
    }

    return false;
};

export const validateRepeatPassword = (repeatPassword: string, password: string | undefined): boolean => {
    if (repeatPassword) {
        return repeatPassword === password;
    }
    return false;
};

export const handleValidateInputs = (name: string, value: string, self: Block) => {
    const input = ((self.children.form as Block).children.inputs as Block[]).find((currentInput) => currentInput.props.name === name);
    const elementProps = input?.props;
    let message = null;
    if (name === "login" && !validateLogin(value)) {
        message = "Некорректный логин";
    } else if ((name === "password" || name === "old_password") && !validatePassword(value)) {
        message = "Некорректный пароль";
    } else if (name === "email" && !validateEmail(value)) {
        message = "Некорректная почта";
    } else if ((name === "first_name" || name === "second_name") && !validateNames(value)) {
        message = "Некорректное значение";
    } else if (name === "phone" && !validatePhone(value)) {
        message = "Некорретный телефон";
    } else if (name === "repeat_password") {
        const password = ((self.children.form as Block).children.inputs as Block[])
            ?.find((elem) => elem.props.name === "password")
            ?.getContent()
            ?.querySelector("input")?.value;
        if (!validateRepeatPassword(value, password)) {
            message = "Пароли не совпадают";
        }
    } else if (name === "message") {
        if (!value) {
            elementProps.inputClasses += " input--error";
            elementProps.value = "";
            return true;
        }
    }
    if (message) {
        elementProps.inputClasses += " input--error";
        elementProps.error = message;
        elementProps.inputErrorClasses += " input__error--active";
        elementProps.value = "";
        return true;
    }
    elementProps.value = value;
    elementProps.inputClasses = elementProps.inputClasses.replace("input--error", "").trim();
    elementProps.error = "";
    elementProps.inputErrorClasses = elementProps.inputErrorClasses.replace("input__error--active", "").trim();
    return false;
};
