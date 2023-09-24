import { DATE_OPTIONS } from "./constants.ts";

export const converChatsListsDate = (date: Date): string => {
    const currentDate = new Date();
    const rusFormattedDate = date.toLocaleString("ru", DATE_OPTIONS).split(" ");
    if (currentDate.getDate() === date.getDate()) return "сегодня";
    if (currentDate.getDate() - 1 === date.getDate()) return "вчера";
    if (currentDate.getFullYear() === date.getFullYear()) {
        return `${rusFormattedDate[1]} ${rusFormattedDate[2].slice(0, 3)}`;
    }
    return `${rusFormattedDate[1]} ${rusFormattedDate[2].slice(0, 3)} ${rusFormattedDate[3]}`;
};

export const converChatDate = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    if (minutes < 10) {
        return `${hours}:0${minutes}`;
    }
    return `${hours}:${minutes}`;
};
