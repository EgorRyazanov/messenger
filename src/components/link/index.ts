import "./link.scss";
import { Block } from "../../utils/block.ts";

interface LinkProps {
    text: string;
    url?: string;
    linkClasses?: string;
    events?: Record<string, (args: any) => void>;
}

export class LinkComponent extends Block<LinkProps> {
    constructor({ text, events = {}, url = "/", linkClasses = "" }: LinkProps) {
        const props = { text, url, linkClasses, events };
        super(props);
    }

    render() {
        return this.compile('<a class="link {{linkClasses}}" href={{url}}>{{text}}</a>', this.props);
    }
}
