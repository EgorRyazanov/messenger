const EMPTY_MESSAGE = "Обязательно поле";
const MIN_VALUE_MESSAGE = (minValue: number): string => {
    return `Значение должно быть больше ${minValue}`;
};
const MAX_VALUE_MESSAGE = (maxValue: number): string => {
    return `Значение должно быть меньше, чем ${maxValue}`;
};

const isTargetValueBiggerThanMinValue = (value: string, threshold: number): boolean => {
    return value.length >= threshold;
};

const isTargetValueLessThanMaxValue = (value: string, threshold: number): boolean => {
    return value.length <= threshold;
};

const hasValueNumbers = (value: string): boolean => {
    return /[0-9]+/.test(value);
};

const hasValueCapitalLetters = (value: string): boolean => {
    return /[A-ZА-ЯЁ]+/.test(value);
};

const isValueValidNumber = (value: string): boolean => {
    return !Number.isNaN(Number(value));
};

export const validateLogin = (login: string): string | null => {
    if (login === "") {
        return EMPTY_MESSAGE;
    }

    if (!isTargetValueBiggerThanMinValue(login, 3)) {
        return MIN_VALUE_MESSAGE(2);
    }

    if (!isTargetValueLessThanMaxValue(login, 20)) {
        return MAX_VALUE_MESSAGE(21);
    }

    if (isValueValidNumber(login)) {
        return "Значение не должно состоять только из цифр";
    }

    if (!/^[a-zA-Z0-9-_]+$/.test(login)) {
        return "Только латиница, может содержать цифры и дефис";
    }

    return null;
};

export const validatePassword = (password: string): string | null => {
    if (password === "") {
        return EMPTY_MESSAGE;
    }

    if (!isTargetValueBiggerThanMinValue(password, 8)) {
        return MIN_VALUE_MESSAGE(7);
    }

    if (!isTargetValueLessThanMaxValue(password, 40)) {
        return MAX_VALUE_MESSAGE(41);
    }

    if (!hasValueNumbers(password)) {
        return "Значение должно содержать хотя бы одну цифру";
    }

    if (!hasValueCapitalLetters(password)) {
        return "Значение должно содержать хотя бы одну заглавную буквы";
    }

    if (!/^[a-zA-Z0-9]+$/.test(password)) {
        return "Только латиница и цифры";
    }

    return null;
};

export const validateEmail = (email: string): string | null => {
    if (email === "") {
        return EMPTY_MESSAGE;
    }

    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
        return "Некорректная почта";
    }

    return null;
};

export const validateNames = (name: string): string | null => {
    if (name === "") {
        return EMPTY_MESSAGE;
    }

    if (!hasValueCapitalLetters(name[0])) {
        return "Первая буквы должна быть заглавной";
    }

    if (!/^[a-zA-Zа-яА-ЯёЁ-]+$/.test(name)) {
        return "Значение должно содержать латиницу или кириллицу. Может включать дефис";
    }

    return null;
};

export const validatePhone = (phone: string): string | null => {
    if (phone === "") {
        return EMPTY_MESSAGE;
    }

    if (!isTargetValueBiggerThanMinValue(phone, 10)) {
        return MIN_VALUE_MESSAGE(9);
    }

    if (!isTargetValueLessThanMaxValue(phone, 15)) {
        return MAX_VALUE_MESSAGE(16);
    }

    if (!isValueValidNumber(phone.slice(1))) {
        return "Только цифры";
    }

    const countPlusSymbols = phone.split("+").length - 1;

    if (!(countPlusSymbols === 1 && phone[0] === "+")) {
        return "Значение должно начинаться с '+'";
    }

    return null;
};
