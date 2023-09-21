import { userErrorTemplate } from "./error-page.ts";
import { LinkComponent } from "../../components/link/index.ts";
import { Block } from "../../utils/block.ts";

export class ErrorPage extends Block {
    protected init() {
        this.children.linkBack = new LinkComponent({
            text: "Назад к чатам",
            url: "/",
            events: {
                click: () => this.removeEvents(),
            },
        });
    }

    protected render() {
        return this.compile(userErrorTemplate, this.props);
    }
}
