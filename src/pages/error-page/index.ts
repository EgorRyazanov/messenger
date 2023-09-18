import { userErrorTemplate } from "./error-page.ts";
import { LinkComponent } from "../../components/link/index.ts";
import { Block } from "../../utils/block.ts";

interface ErrorProps {
    title: string;
    linkBack: LinkComponent;
}

export class ErrorPage extends Block<ErrorProps> {
    public constructor(props: { title: string }) {
        super({
            linkBack: new LinkComponent({
                text: "Назад к чатам",
                url: "/",
                events: {
                    click: () => this.removeEvents(),
                },
            }),
            ...props,
        });
    }

    protected render() {
        return this.compile(userErrorTemplate, this.props);
    }
}
