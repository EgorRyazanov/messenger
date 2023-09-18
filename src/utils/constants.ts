import defaultImage from "../assets/default-image.jpg";

export type Chat = {
    name: string;
    avatar: string | null;
    new: number;
    id: string;
    messanges: {
        author: string;
        message: string;
        date: string;
    }[];
} | null;

export type Chats = Chat[];

export type TProfile = {
    email: string;
    login: string;
    name: string;
    secondName: string;
    displayName: string;
    phone: string;
    avatar: string;
};

export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    year: "numeric",
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
};

export const DATA_CHATS = [
    {
        name: "Дарья",
        avatar: defaultImage,
        new: 0,
        id: "algsdfgjsdfgjflkgsjdflkjsdflkgj123141",
        messanges: [
            {
                author: "Вы",
                message: "Привет",
                date: "2022-06-10T12:00:00.000Z",
            },
            {
                author: "Дарья",
                message: "Здравствуй",
                date: "2023-06-10T12:01:00.000Z",
            },
            {
                author: "Вы",
                message: "Как дела?",
                date: "2023-06-10T12:01:00.012Z",
            },
            {
                author: "Вы",
                message: "Прекрасная погода, не правда ли?",
                date: "2023-06-10T12:01:00.123Z",
            },
            {
                author: "Дарья",
                message: "Я в восторге с самого утра, мне нужно скорее тебе рассказать, давай встретимся?",
                date: "2022-06-10T12:01:00.000Z",
            },
            {
                author: "Вы",
                message: "Привет",
                date: "2022-06-10T12:00:00.000Z",
            },
            {
                author: "Дарья",
                message: "Здравствуй",
                date: "2023-06-10T12:01:00.000Z",
            },
            {
                author: "Вы",
                message: "Как дела?",
                date: "2023-06-10T12:01:00.012Z",
            },
            {
                author: "Вы",
                message: "Прекрасная погода, не правда ли?",
                date: "2023-06-10T12:01:00.123Z",
            },
            {
                author: "Дарья",
                message: "Я в восторге с самого утра, мне нужно скорее тебе рассказать, давай встретимся?",
                date: "2022-06-10T12:01:00.000Z",
            },
            {
                author: "Вы",
                message: "Привет",
                date: "2022-06-10T12:00:00.000Z",
            },
            {
                author: "Дарья",
                message: "Здравствуй",
                date: "2023-06-10T12:01:00.000Z",
            },
            {
                author: "Вы",
                message: "Как дела?",
                date: "2023-06-10T12:01:00.012Z",
            },
            {
                author: "Вы",
                message: "Прекрасная погода, не правда ли?",
                date: "2023-06-10T12:01:00.123Z",
            },
            {
                author: "Дарья",
                message: "Я в восторге с самого утра, мне нужно скорее тебе рассказать, давай встретимся?",
                date: "2022-06-10T12:01:00.000Z",
            },
            {
                author: "Вы",
                message: "Привет",
                date: "2022-06-10T12:00:00.000Z",
            },
            {
                author: "Дарья",
                message: "Здравствуй",
                date: "2023-06-10T12:01:00.000Z",
            },
            {
                author: "Вы",
                message: "Как дела?",
                date: "2023-06-10T12:01:00.012Z",
            },
            {
                author: "Вы",
                message: "Прекрасная погода, не правда ли?",
                date: "2023-06-10T12:01:00.123Z",
            },
            {
                author: "Дарья",
                message: "Я в восторге с самого утра, мне нужно скорее тебе рассказать, давай встретимся?",
                date: "2022-06-10T12:01:00.000Z",
            },
            {
                author: "Вы",
                message: "Привет",
                date: "2022-06-10T12:00:00.000Z",
            },
            {
                author: "Дарья",
                message: "Здравствуй",
                date: "2023-06-10T12:01:00.000Z",
            },
            {
                author: "Вы",
                message: "Как дела?",
                date: "2023-06-10T12:01:00.012Z",
            },
            {
                author: "Вы",
                message: "Прекрасная погода, не правда ли?",
                date: "2023-06-10T12:01:00.123Z",
            },
            {
                author: "Дарья",
                message:
                    "Lorem Ipsum - это текст- часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
                date: "2022-06-10T12:01:00.000Z",
            },
        ],
    },
    {
        name: "Алена",
        avatar: null,
        id: "fdslgjkdjlfshldfhjd",
        new: 0,
        messanges: [
            {
                author: "Вы",
                message: "Привет",
                date: "2023-06-10T12:00:00.000Z",
            },
            {
                author: "Алена",
                message: "hello",
                date: "2023-06-10T12:01:00.000Z",
            },
            {
                author: "Вы",
                message: "Как дела?",
                date: "2023-06-10T12:01:00.012Z",
            },
            {
                author: "Вы",
                message: "Прекрасная погода, не правда ли?",
                date: "2023-06-10T12:01:00.123Z",
            },
            {
                author: "Вы",
                message: "Я в восторге с самого утра, мне нужно скорее тебе рассказать, давай встретимся?",
                date: "2023-06-17T12:01:00.000Z",
            },
        ],
    },
    {
        name: "Дарья",
        avatar: null,
        id: "alfmdlskmglasmdgaksdmg",
        new: 1,
        messanges: [
            {
                author: "Вы",
                message: "Привет",
                date: "2023-06-10T12:00:00.000Z",
            },
            {
                author: "Дарья",
                message: "Привееет",
                date: "2023-06-10T12:01:00.000Z",
            },
            {
                author: "Вы",
                message: "Как дела?",
                date: "2023-06-10T12:01:00.012Z",
            },
            {
                author: "Вы",
                message: "Прекрасная погода, не правда ли?",
                date: "2023-06-10T12:01:00.123Z",
            },
            {
                author: "Дарья",
                message: "Ваау",
                date: "2023-06-16T12:01:00.000Z",
            },
        ],
    },
    {
        name: "Алена",
        id: "12321kfsdlkamfklsa",
        avatar: null,
        new: 2,
        messanges: [
            {
                author: "Вы",
                message: "Привет",
                date: "2023-06-10T12:00:00.000Z",
            },
            {
                author: "Алена",
                message: "Привееет",
                date: "2023-06-10T12:01:00.000Z",
            },
            {
                author: "Вы",
                message: "Как дела?",
                date: "2023-06-10T12:01:00.012Z",
            },
            {
                author: "Вы",
                message: "Прекрасная погода, не правда ли?",
                date: "2023-06-10T12:01:00.123Z",
            },
            {
                author: "Алена",
                message: "Я в восторге с самого утра, мне нужно скорее тебе рассказать, давай встретимся?",
                date: "2023-06-10T12:01:00.000Z",
            },
        ],
    },
];

export const DATA_PROFILE = {
    email: "aricsybsn@gmail.com",
    login: "aricsy",
    name: "Егор",
    secondName: "Рязанов",
    displayName: "Егор",
    phone: "79999999999",
    avatar: defaultImage,
};
