import "./button.scss";
import { Block } from "../../utils/block";

export class ButtonIcon extends Block {
    constructor({ img, url = "", classNames = "", type = "button" }) {
        super({
            img,
            url,
            classNames,
            type,
        });
    }

    render() {
        return this.compile(
            `<button type={{type}} {{#if url}} onclick="window.location.href = '{{url}}'" {{/if}} class="icon-button {{classNames}}">
                <img src='{{img}}' alt="Кнопка">
            </button>`,
            this.props,
        );
    }
}
