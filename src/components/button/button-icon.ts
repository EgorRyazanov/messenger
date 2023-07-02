import "./button.scss";
import { Block } from "../../utils/block.ts";

interface IBUttonIcon {
    img: string;
    url?: string;
    classNames?: string;
    type?: string;
}

export class ButtonIcon extends Block<IBUttonIcon> {
    constructor({ img, url = "", classNames = "", type = "button" }: IBUttonIcon) {
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
