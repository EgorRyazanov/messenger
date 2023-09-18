/* eslint-disable */

import Handlebars from "handlebars";
import { nanoid } from "nanoid";

import { EventBus } from "./event-bus";

export class Block<P extends Record<string, any> = any> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    };
    public children: Record<string, Block<any> | Block<any>[]>;
    public id = nanoid(6);
    public props: P;
    private eventBus: () => EventBus;
    private _element: HTMLElement | null = null;

    constructor(propsWithChildren: P) {
        const eventBus = new EventBus();

        const { props, children } = this._getChildrenAndProps(propsWithChildren);

        this.children = children;
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    protected removeEvents() {
        this._removeEvents();
        Object.keys(this.children).forEach((child) => {
            if (Array.isArray(this.children[child])) {
                (this.children[child] as Block<P>[]).forEach((ch) => ch.removeEvents());
            } else {
                (this.children[child] as Block<P>).removeEvents();
            }
        });
    }

    private _getChildrenAndProps(childrenAndProps: P): { props: P; children: Record<string, Block<P> | Block<P>[]> } {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block<P> | Block<P>[]> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if ((Array.isArray(value) && value.length > 0 && value.every((v) => v instanceof Block)) || value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props: props as P, children };
    }

    private _addEvents() {
        const { events } = this.props;

        if (events != null) {
            Object.keys(events).forEach((eventName) => {
                this._element?.addEventListener(eventName, events[eventName]);
            });
        }
    }

    private _removeEvents() {
        const { events } = this.props;

        if (events != null) {
            Object.keys(events).forEach((eventName) => {
                this._element?.removeEventListener(eventName, events[eventName]);
            });
        }
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _init() {
        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {}

    private _componentDidMount() {
        this.componentDidMount();
    }

    protected componentDidMount() {}

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach((ch) => ch.dispatchComponentDidMount());
            } else {
                child.dispatchComponentDidMount();
            }
        });
    }

    private _componentDidUpdate(oldProps: P, newProps: P) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(_oldProps: P, _newProps: P) {
        return true;
    }

    public setProps = (nextProps: P) => {
        if (nextProps == null) {
            return;
        }
        Object.assign(this.props, nextProps);
        this._componentDidUpdate(this.props, nextProps);
    };

    public getProps = (key: string) => {
        const value = this.props[key];
        return value;
    };

    public get element() {
        return this._element;
    }

    private _render() {
        const fragment = this.render();
        const newElement = fragment?.firstElementChild;

        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement as HTMLElement;

        this._addEvents();
    }

    public compile(template: string, context: any) {
        const contextAndDummies = { ...context };

        Object.entries(this.children).forEach(([name, component]) => {
            if (Array.isArray(component)) {
                contextAndDummies[name] = component.map((child) => `<div data-id="${child.id}"></div>`);
            } else {
                contextAndDummies[name] = `<div data-id="${component.id}"></div>`;
            }
        });
        const html = Handlebars.compile(template)(contextAndDummies);

        const temp = document.createElement("template");
        temp.innerHTML = html;

        const replaceSkeleton = (component: any) => {
            const dummy = temp.content.querySelector(`[data-id="${component.id}"]`);
            if (dummy == null) {
                return;
            }

            component.getContent()?.append(...Array.from(dummy.childNodes));
            dummy.replaceWith(component.getContent());
        };

        Object.entries(this.children).forEach(([_, component]) => {
            if (Array.isArray(component)) {
                component.forEach((comp) => replaceSkeleton(comp));
            } else {
                replaceSkeleton(component);
            }
        });

        return temp.content;
    }

    protected render() {
        return new DocumentFragment();
    }

    public getContent() {
        return this.element;
    }

    private _makePropsProxy(props: P) {
        const self = this;

        return new Proxy(props, {
            get(target, key: string) {
                if (typeof key === "string" && key.startsWith("_")) {
                    throw new Error("No access");
                }
                const value = target[key];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, key: string, value) {
                if (typeof key === "string" && key.startsWith("_")) {
                    throw new Error("No access");
                }
                const oldTarget = { ...target };

                if (key in target) {
                    target[key as keyof P] = value;
                    self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                    return true;
                }

                return false;
            },
            deleteProperty() {
                throw new Error("No access");
            },
        });
    }
}
