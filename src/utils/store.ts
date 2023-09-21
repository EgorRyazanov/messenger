import { User } from "../core/models/user.ts";
import { EventBus } from "./event-bus.ts";
import { set } from "./helpers.ts";

export enum StoreEvents {
    Updated = "updated",
}

export interface State {
    user: User;
}

export class Store extends EventBus {
    private state: State = {} as State;

    public set(keypath: string, data: unknown) {
        set(this.state, keypath, data);

        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state;
    }
}

export const store = new Store();
