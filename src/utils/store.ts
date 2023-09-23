import { Chat } from "../core/models/chat.ts";
import { User } from "../core/models/user.ts";
import { EventBus } from "./event-bus.ts";
import { set } from "./helpers.ts";

export enum StoreEvents {
    Updated = "updated",
}

export interface State {
    user: User | null;
    chats: Chat[];
    selectedChat: Chat["id"] | null;
}

export class Store extends EventBus {
    private state: State = {
        user: null,
        chats: [],
        selectedChat: null,
    } as State;

    public set(keypath: string, data: unknown) {
        set(this.state, keypath, data);

        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state;
    }
}

export const store = new Store();
