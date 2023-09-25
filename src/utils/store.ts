import { Chat } from "../core/models/chat.ts";
import { Message } from "../core/models/message.ts";
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
    messages: Record<Chat["id"], Message[]>;
}

export class Store extends EventBus {
    private state: State = {
        user: null,
        chats: [],
        selectedChat: null,
        messages: {},
    } as State;

    public set(keypath: string, data: unknown): void {
        set(this.state, keypath, data);

        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState(): State {
        return this.state;
    }

    public selectUserId(): User["id"] | null {
        return this.state.user?.id ?? null;
    }
}

export const store = new Store();
