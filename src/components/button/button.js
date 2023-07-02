import "./button.scss";
import { Block } from "../../utils/block";

export class Button extends Block {
    constructor({ text, events = {}, type = "button", classNames = "" }) {
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
