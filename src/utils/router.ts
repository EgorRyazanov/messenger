import { Routes } from "../index.ts";
import { Block } from "./block.ts";
import { Route } from "./route.ts";

class Router {
    private history: History;

    private routes: Route[];

    private _currentRoute: Route | null;

    public constructor(private readonly _rootQuery: string) {
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
    }

    public use<P extends typeof Block>(pathname: string, block: P, props?: Block["props"]): Router {
        const route = new Route(pathname, block, { ...props, rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }

    public start(): void {
        window.onpopstate = (event: PopStateEvent) => {
            this._onRoute((event.currentTarget as Window).location.pathname ?? "");
        };

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string): void {
        const route = this.getRoute(pathname);

        if (this._currentRoute != null) {
            this._currentRoute.leave();
        }
        if (route != null) {
            this._currentRoute = route;
            route.render();
        } else {
            this.go(Routes.Error);
        }
    }

    public go(pathname: string): void {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    public back(): void {
        if (this._currentRoute) {
            this.history.back();
        }
    }

    public forward() {
        this.history.forward();
    }

    private getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }
}

export const router = new Router("#app");
