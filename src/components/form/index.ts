import { Block } from "../../utils/block.ts";
import { ButtonIcon } from "../button/button-icon.ts";
import { Button } from "../button/button.ts";
import { Input } from "../input/index.ts";
import { Link } from "../link/index.ts";
import { formTemplate } from "./form.tmpl.ts";
import "./form.scss";

interface IForm {
    button: Button | ButtonIcon;
    link?: Link;
    events?: Record<string, (args: any) => void>;
    inputs?: Input[];
    classNames?: string;
    title?: string;
}

export class Form extends Block<IForm> {
    constructor({ button, link, events = {}, inputs = [], classNames = "", title = "" }: IForm) {
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
