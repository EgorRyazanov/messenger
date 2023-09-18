import "./button.scss";
import { Block } from "../../utils/block.ts";

interface ButtonIconProps {
    img: string;
    url?: string;
    classNames?: string;
    type?: string;
}

export class ButtonIconComponent extends Block<ButtonIconProps> {
    public constructor({ img, url = "", classNames = "", type = "button" }: ButtonIconProps) {
        super({
            img,
            url,
            classNames,
            type,
        });
    }

    protected render() {
        return this.compile(
            `<button type={{type}} {{#if url}} onclick="window.location.href = '{{url}}'" {{/if}} class="icon-button {{classNames}}">
                <img src='{{img}}' alt="Кнопка">
            </button>`,
            this.props,
        );
    }
}
