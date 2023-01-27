import { IUserItem } from "@/types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const InitialState = {} as IUserItem;

export type ActionUser = {
  key: "SET";
  payload?: IUserItem | undefined;
};
const typeReducers = (state: IUserItem, payload: ActionUser["payload"]) => ({
  SET: {
    ...state,
    ...payload,
  },
});

const User_AtomWithStorage = atomWithStorage("user", InitialState);

const reducer = (state = InitialState, action: ActionUser) =>
  typeReducers(state, action.payload)[action.key] ?? state;

type ReducerType = typeof reducer;

const ReducerWithAtom = (reducer: ReducerType) =>
  atom(
    (get) => get(User_AtomWithStorage),
    (get, set, action: ActionUser) =>
      set(User_AtomWithStorage, reducer(get(User_AtomWithStorage), action))
  );
const exportReduceWithAtom = ReducerWithAtom(reducer);
export default exportReduceWithAtom;
