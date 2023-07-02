/* eslint-disable */

import Handlebars from "handlebars";
import { nanoid } from "nanoid";
import { EventBus } from "./event-bus";

export class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    };

    id = nanoid(6);

    constructor(propsWithChildren) {
        const eventBus = new EventBus();

        const { props, children } = this._getChildrenAndProps(propsWithChildren);

        this.children = children;
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    removeEvents() {
        this._removeEvents();
        Object.keys(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach((ch) => ch.removeEvents());
            } else {
                child.removeEvents();
            }
        });
    }

    _getChildrenAndProps(childrenAndProps = {}) {
        const props = {};
        const children = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if ((Array.isArray(value) && value.length > 0 && value.every((v) => v instanceof Block)) || value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props, children };
    }

    _addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    _removeEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element?.removeEventListener(eventName, events[eventName]);
        });
    }

    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _init() {
        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    init() {}

    _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach((ch) => ch.dispatchComponentDidMount());
            } else {
                child.dispatchComponentDidMount();
            }
        });
    }

    _componentDidUpdate(oldProps, newProps) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProps, newProps) {
        return true;
    }

    setProps = (nextProps) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
        this._componentDidUpdate(this.props, nextProps);
    };

    getProps = (key) => {
        const value = this.props[key];
        return value;
    };

    get element() {
        return this._element;
    }

    _render() {
        const fragment = this.render();
        const newElement = fragment?.firstElementChild;

        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        this._addEvents();
    }

    compile(template, context) {
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

        const replaceSkeleton = (component) => {
            const dummy = temp.content.querySelector(`[data-id="${component.id}"]`);
            if (!dummy) return;
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

    render() {
        return new DocumentFragment();
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props) {
        const self = this;

        return new Proxy(props, {
            get(target, key) {
                if (typeof key === "string" && key.startsWith("_")) {
                    throw new Error("No access");
                }
                const value = target[key];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, key, value) {
                if (typeof key === "string" && key.startsWith("_")) {
                    throw new Error("No access");
                }
                const oldTarget = { ...target };

                target[key] = value;

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("No access");
            },
        });
    }
}
