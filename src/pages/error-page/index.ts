import { userErrorTemplate } from "./error-page.ts";
import { LinkComponent } from "../../components/link/index.ts";
import { Block } from "../../utils/block.ts";
import { Routes } from "../../index.ts";

export class ErrorPage extends Block {
    protected init(): void {
        this.children.linkBack = new LinkComponent({
            text: "Назад к чатам",
            url: Routes.Main,
            events: {
                click: () => this.removeEvents(),
            },
        });
    }

    protected render(): DocumentFragment {
        return this.compile(userErrorTemplate, this.props);
    }
}
