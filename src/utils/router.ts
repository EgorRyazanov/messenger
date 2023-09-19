import { Block } from "./block.ts";
import { Route } from "./route.ts";

class Router {
    private history: History;

    private routes: Route[];

    // private __instance: Router;

    private _currentRoute: Route | null;

    public constructor(private readonly _rootQuery: string) {
        // if (Router.__instance) {
        //     return Router.__instance;
        // }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;

        // Router.__instance = this;
    }

    public use<P extends typeof Block>(pathname: string, block: P, props?: Block["props"]) {
        const route = new Route(pathname, block, { ...props, rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }

    public start() {
        window.onpopstate = (event: PopStateEvent) => {
            this._onRoute((event.currentTarget as Window).location.pathname ?? "");
        };

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        if (route != null) {
            this._currentRoute = route;
            route.render();
        }
    }

    public go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    public back() {
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
