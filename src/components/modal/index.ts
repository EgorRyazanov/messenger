import { Block } from "../../utils/block.ts";
import { render } from "../../utils/route.ts";
import { modalTemplate } from "./modal.tmpl.ts";
import "./modal.scss";
import { FormComponent } from "../form/index.ts";
import { ButtonComponent } from "../button/button.ts";

interface ModalComponentProps {
    container: string;
    form: FormComponent;
}

export class ModalComponent extends Block<ModalComponentProps> {
    protected init(): void {
        this.children.CancelButton = new ButtonComponent({
            text: "Закрыть",
            classNames: "cancel-button",
            events: {
                click: this.closeModal.bind(this),
            },
        });
    }

    public createPortal(): void {
        document.body.classList.add("modal__portal");
        render(this.props.container, this);
    }

    public closeModal(): void {
        if (this.children.form instanceof FormComponent) {
            this.children.form.clearForm();
        }
        const modal = document.getElementById("modal");
        const container = document.querySelector(this.props.container);
        if (modal != null && container != null) {
            document.body.classList.remove("modal__portal");
            container.removeChild(modal);
        }
    }

    protected render(): DocumentFragment {
        return this.compile(modalTemplate, this.props);
    }
}
