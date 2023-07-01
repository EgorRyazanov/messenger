import Handlebars from "handlebars";
import "./chat.scss";
import { converChatDate } from "../../utils/utils";

Handlebars.registerHelper("ifMessageAuthorContainer", function (message, opts) {
    if (message.author === "Вы") {
        return opts.fn("class='main__message main__message--you'");
    }
    return opts.inverse("class='main__message'");
});

Handlebars.registerHelper("messageDate", function (message, opts) {
    if (message.author === "Вы") {
        return opts.fn(converChatDate(message.date));
    }
    return opts.inverse(converChatDate(message.date));
});

export const chatTemplate = `
    {{#if activeChat}}
        <div class="chat__container">
            <div class="chat__header">
                <div class="header__user">
                    {{#if activeChat.avatar}}
                        <img class="header__image" src={{activeChat.avatar}} alt="Аватарка">
                    {{else}}
                        <div class="header__image"></div>
                    {{/if}}
                    <p class="header__name">{{activeChat.name}}</p>
                </div>
                {{{userSettingButton}}}
            </div>
            <div class="chat__main">
                {{#each activeChat.messanges}}
                    <div {{#ifMessageAuthorContainer this}} {{{this}}} {{else}} {{{this}}} {{/ifMessageAuthorContainer}}>
                        <p>{{this.message}}</p>
                        {{#messageDate this}}
                            <p class="main__date main__date--you">{{this}}<p>
                        {{else}}
                            <p class="main__date">{{this}}</p>
                        {{/messageDate}}
                    </div>
                {{/each}}
            </div>
            <div class="chat__footer">
                {{{messageSettingButton}}}
                {{{form}}}
            </div>
        <div>
    {{else}}
        <div class="chat__container">
            <div class="chat--empty">
                <h3 class="chat__error">Выберите чат, чтобы отправить сообщение</h3>
            </div>
        </div>
    {{/if}}

`;
