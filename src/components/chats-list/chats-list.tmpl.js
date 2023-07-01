import "./chats-list.scss";
import arrow from "../../assets/icons/arrow.svg";
import Handlebars from "handlebars";
import { converChatsListsDate } from "../../utils/utils";

Handlebars.registerHelper("lastMessage", function (array) {
    if (array && array.length > 0) {
        return array[array.length - 1].message;
    }
    return "";
});

Handlebars.registerHelper("lastItemDate", function (array) {
    if (array && array.length > 0) {
        return converChatsListsDate(array[array.length - 1].date);
    }
    return "";
});

Handlebars.registerHelper("ifIdEquals", function (id, opts) {
    const activeId = window.location.pathname.slice(1);
    if (activeId === id) {
        return opts.fn("background-color: #FCE8E5");
    }
    return opts.inverse({});
});

Handlebars.registerHelper("ifLastPerson", function (array, opts) {
    if (array && array.length > 0) {
        if (array[array.length - 1].author !== "Вы") {
            return opts.fn(array[array.length - 1].message);
        }
        return opts.inverse(array[array.length - 1].message);
    }
    return "";
});

export const chatsListTemplate = `
    <div class="chats-list__container">
        <a href="/profile" class="chats-list__profile-link">
            Профиль
            <img class="profile-link__image" src=${arrow} alt="Картинка">
        </a>
        <input name="search" class="chats-list__search" placeholder="Поиск" >
        <ul class="chats-list__persons-container">
            {{#each chats}}
                <li {{#ifIdEquals this.id }} style='{{this}}' {{else}}  {{/ifIdEquals}} onclick="window.location.replace('/{{this.id}}')" class="persons__item"> 
                    {{#if this.avatar}}
                        <img class="item__avatar" src={{this.avatar}} alt="Аватар - {{this.name}}">
                    {{else}}
                        <div class="item__avatar"></div>
                    {{/if}}
                    <div class="item__text-container">
                        <h5 class="item__title">{{this.name}}</h5>
                        <p class="item__text">{{lastMessage this}}</p>
                        {{#ifLastPerson this.messanges}}
                            <p class="item__text">{{this}}</p>
                        {{else}}
                            <p class="item__text"><b class="item__text--bold">Вы:</b> {{this}}</p>
                        {{/ifLastPerson}}
                    </div>
                    <div class="item__additional">
                        <div class="additional__date">
                            {{lastItemDate this.messanges}}
                        </div>
                        {{#if this.new}}
                        <div class="additional__new-messenges-container">
                            <p class="additional__new-messenges">{{this.new}}</p>
                        <div>
                        {{/if}}
                    </div>
                </li>
            {{/each}}
        </ul>
    </div>
`;
