import { Block } from "../../utils/block.ts";
import { ButtonIconComponent } from "../button/button-icon.ts";
import { ButtonComponent } from "../button/button.ts";
import { InputComponent } from "../input/index.ts";
import { LinkComponent } from "../link/index.ts";
import { formTemplate } from "./form.tmpl.ts";
import "./form.scss";

interface FormProps {
    button: ButtonComponent | ButtonIconComponent;
    link?: LinkComponent;
    events?: Record<string, (args: any) => void>;
    inputs?: InputComponent[];
    classNames?: string;
    title?: string;
}

export class FormComponent extends Block<FormProps> {
    constructor({ button, link, events = {}, inputs = [], classNames = "", title = "" }: FormProps) {
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

    public validateInputs(): void {
        if (this.children.inputs && Array.isArray(this.children.inputs))
            (this.children.inputs as InputComponent[]).forEach((input) => {
                input.validate();
            });
    }

    public isFormValid(): boolean {
        if (this.children.inputs && Array.isArray(this.children.inputs)) {
            return (this.children.inputs as InputComponent[]).every((input) => {
                return input.isInputValid();
            });
        }

        return false;
    }

    protected render() {
        return this.compile(formTemplate, this.props);
    }
}
