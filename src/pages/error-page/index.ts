import { userErrorTemplate } from "./error-page.ts";
import { Link } from "../../components/link/index.ts";
import { Block } from "../../utils/block.ts";

interface IError {
    title: string;
    linkBack: Link;
}

export class Error extends Block<IError> {
    constructor(props: { title: string }) {
        super({
            linkBack: new Link({
                text: "Назад к чатам",
                url: "/",
                events: {
                    click: () => this.removeEvents(),
                },
            }),
            ...props,
        });
    }

    render() {
        return this.compile(userErrorTemplate, this.props);
    }
}
