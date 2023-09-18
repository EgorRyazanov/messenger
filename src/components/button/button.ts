import "./button.scss";
import { Block } from "../../utils/block.ts";

interface ButtonProps {
    text: string;
    events?: Record<string, (args: any) => void>;
    type?: string;
    classNames?: string;
}

export class ButtonComponent extends Block<ButtonProps> {
    public constructor({ text, events = {}, type = "button", classNames = "" }: ButtonProps) {
        const props = {
            text,
            type,
            events,
            classNames,
        };
        super(props);
    }

    protected render() {
        return this.compile('<button type={{type}} class="primary-button {{classNames}}">{{text}}</button>', this.props);
    }
}
