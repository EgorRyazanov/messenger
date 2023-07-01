import "./link.scss";
import { Block } from "../../utils/block";

export class Link extends Block {
    constructor({ text, url = "/", linkClasses = "" }) {
        const props = { text, url, linkClasses };
        console.log(props);
        super(props);
    }

    render() {
        return this.compile(`<a class="link {{linkClasses}}" href={{url}}>{{text}}</a>`, this.props);
    }
}
