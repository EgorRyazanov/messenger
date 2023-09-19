import { Block } from "./block.ts";

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

export function render(query: string, block: Block) {
    const root = document.querySelector(query);
    const childNode = block.getContent();
    if (root != null && childNode != null) {
        root.append(childNode);
        block.dispatchComponentDidMount();
    }
    return root;
}

export class Route {
    private _pathname: string;

    private _blockClass: typeof Block;

    private _block: null | Block;

    private _props: Block["props"];

    public constructor(pathname: string, view: typeof Block, props: Block["props"]) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    public navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    public leave() {
        if (this._block) {
            this._block = null;
        }
    }

    public match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    public render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props);
            render(this._props.rootQuery, this._block);
        }
    }
}
