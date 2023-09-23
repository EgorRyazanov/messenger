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
    error?: string;
}

export class FormComponent extends Block<FormProps> {
    public constructor({ button, link, events = {}, inputs = [], classNames = "", title = "", error = "" }: FormProps) {
        const props = {
            button,
            link,
            inputs,
            classNames,
            title,
            events,
            error,
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

    public getValues<T>(): T | null {
        if (this.children.inputs && Array.isArray(this.children.inputs)) {
            const object: T = {} as T;
            (this.children.inputs as InputComponent[]).forEach((input) => {
                object[input.name as keyof T] = input.value as T[keyof T];
            });
            return object;
        }

        return null;
    }

    public clearForm() {
        this.props.error = "";
        if (this.children.inputs && Array.isArray(this.children.inputs)) {
            this.children.inputs.forEach((input) => {
                if (input instanceof InputComponent) {
                    input.setProps({ ...input.props, value: "" });
                }
            });
        }
    }

    protected render() {
        return this.compile(formTemplate, this.props);
    }
}
