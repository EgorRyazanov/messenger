import Handlebars from "handlebars";
import "./button.scss";

export const Button = ({ text, type = "button", url = "", classNames = "" }) =>
    Handlebars.compile(
        `<button type={{type}} {{#if url}} onclick="window.location.href = '{{url}}'" {{/if}} class="primary-button {{classNames}}">{{text}}</button>`
    )({
        text,
        type,
        url,
        classNames,
    });

export const ButtonIcon = ({ img, url = "", classNames = "" }) =>
    Handlebars.compile(`
    <button {{#if url}} onclick="window.location.href = '{{url}}'" {{/if}} class="icon-button {{classNames}}">
        <img src='{{img}}' alt="Кнопка">
    </button>`)({ classNames, url, img });
