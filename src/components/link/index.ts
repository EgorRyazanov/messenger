import "./link.scss";
import { Block } from "../../utils/block.ts";
import { Routes } from "../../index.ts";

interface LinkProps {
    text: string;
    url?: Routes;
    linkClasses?: string;
    events?: Record<string, (args: any) => void>;
}

export class LinkComponent extends Block<LinkProps> {
    constructor({ text, events = {}, url = Routes.Main, linkClasses = "" }: LinkProps) {
        const props = { text, url, linkClasses, events };
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile('<a class="link {{linkClasses}}" href={{url}}>{{text}}</a>', this.props);
    }
}
