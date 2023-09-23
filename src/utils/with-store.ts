import { Block } from "./block.ts";
import { isEqual } from "./helpers.ts";
import { store, State, StoreEvents } from "./store.ts";

export function withStore<SP extends Record<string, any>>(mapStateToProps: (state: State) => SP) {
    return function wrap<P extends Record<string, any>>(Component: typeof Block<P & SP>) {
        return class WithStore extends Component {
            constructor(props: Omit<P, keyof SP>) {
                let previousState = mapStateToProps(store.getState());

                super({ ...(props as P), ...previousState });

                store.on(StoreEvents.Updated, () => {
                    const stateProps = mapStateToProps(store.getState());

                    if (isEqual(previousState, stateProps)) {
                        return;
                    }

                    previousState = stateProps;

                    this.setProps({ ...this.props, ...stateProps });
                });
            }
        };
    };
}

export const withUser = withStore((state) => ({ ...state.user }));

export const withChats = withStore((state) => ({ chats: state.chats }));

export const withMessages = withStore((state) => ({ messages: state.messages }));

export const withSelectedChat = withStore((state) => ({ selectedChat: state.selectedChat }));
