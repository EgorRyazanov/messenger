import "./link.scss";
import { Block } from "../../utils/block.ts";

interface ILink {
    text: string;
    url?: string;
    linkClasses?: string;
    events?: Record<string, (args: any) => void>;
}

export class Link extends Block<ILink> {
    constructor({ text, events = {}, url = "/", linkClasses = "" }: ILink) {
        const props = { text, url, linkClasses, events };
        super(props);
    }

    render() {
        return this.compile('<a class="link {{linkClasses}}" href={{url}}>{{text}}</a>', this.props);
    }
}
