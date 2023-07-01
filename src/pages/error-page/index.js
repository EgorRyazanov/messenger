import { userErrorTemplate } from "./error-page";
import { Link } from "../../components/link";
import { Block } from "../../utils/block";

export class Error extends Block {
    constructor(props) {
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
