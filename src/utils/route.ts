import { Block } from "./block.ts";

function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}

export function render(query: string, block: Block): Element | null {
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

    public navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    public leave(): void {
        if (this._block) {
            this.clearRoot();
        }
    }

    public match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    public render(): void {
        if (!this._block) {
            this._block = new this._blockClass(this._props);
            render(this._props.rootQuery, this._block);
        }
    }

    private clearRoot(): void {
        if (this._block != null) {
            this._block.removeEvents();
            this._block = null;
            const root = document.querySelector(this._props.rootQuery);
            if (root != null) {
                root.innerHTML = "";
            }
        }
    }
}
