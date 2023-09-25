import "./button.scss";
import { Block } from "../../utils/block.ts";
import { Routes } from "../../index.ts";

interface ButtonIconProps {
    img: string;
    url?: Routes;
    classNames?: string;
    type?: string;
    events?: Record<string, (args: unknown) => void>;
}

export class ButtonIconComponent extends Block<ButtonIconProps> {
    public constructor({ img, url, classNames, type = "button", events }: ButtonIconProps) {
        super({
            img,
            url,
            classNames,
            type,
            events,
        });
    }

    protected render(): DocumentFragment {
        return this.compile(
            `<button type={{type}} {{#if url}} onclick="window.location.href = '{{url}}'" {{/if}} class="icon-button {{classNames}}">
                <img src='{{img}}' alt="Кнопка">
            </button>`,
            this.props,
        );
    }
}
