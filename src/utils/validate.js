export const validateLogin = (login) => {
    if (login) {
        return login.length >= 3 && login.length <= 20 && /^[a-zA-Z0-9-_]+$/.test(login) && !/^\d+$/.test(login);
    }
    return false;
};

export const validatePassword = (password) => {
    if (password) {
        return password.length >= 8 && password.length <= 40 && /[0-9]+/.test(password) && /[A-Z]+/.test(password) && /^[a-zA-Z0-9]+$/.test(password);
    }

    return false;
};

export const validateEmail = (email) => {
    if (email) {
        const regEmail =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regEmail.test(email);
    }

    return false;
};

export const handleValidateInputs = (name, value, self) => {
    const input = self.children.form.children.inputs.find((input) => input.props.name === name);
    const elementProps = input.props;
    let message = null;
    if (name === "login" && !validateLogin(value)) {
        message = "Некорректный логин";
    } else if (name === "password" && !validatePassword(value)) {
        message = "Некорректный пароль";
    }
    if (message) {
        elementProps.inputClasses = "input--error";
        elementProps.error = message;
        elementProps.inputErrorClasses = "input__error--active";
        elementProps.value = "";
        return true;
    }
    elementProps.value = value;
    elementProps.inputClasses = "";
    elementProps.error = "";
    elementProps.inputErrorClasses = "";
    return false;
};
