import { Block } from "../../utils/block";
import "./form.scss";
import { formTemplate } from "./form.tmpl";

export class Form extends Block {
    constructor({ button, link, events = {}, inputs = {}, classNames = {}, title = "" }) {
        const props = {
            button,
            link,
            inputs,
            classNames,
            title,
            events,
        };
        super(props);
    }

    render() {
        return this.compile(formTemplate, this.props);
    }
}
