import "./button.scss";
import { Block } from "../../utils/block.ts";

interface IButton {
    text: string;
    events?: Record<string, (args: any) => void>;
    type?: string;
    classNames?: string;
}

export class Button extends Block<IButton> {
    constructor({ text, events = {}, type = "button", classNames = "" }: IButton) {
        const props = {
            text,
            type,
            events,
            classNames,
        };
        super(props);
    }

    render() {
        return this.compile('<button type={{type}} class="primary-button {{classNames}}">{{text}}</button>', this.props);
    }
}
