import { atom, AtomEffect } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Master, User } from "../types";

const { persistAtom } = recoilPersist();

export const isClientSideState = atom({
  key: "client-side",
  default: false,
});

const persistAtomEffect: AtomEffect<any> = (param) => {
  param
    .getPromise(isClientSideState)
    .then((isClientSide) => persistAtom(param));
};

export const userState = atom<User>({
  key: "user",
  default: null,
  effects_UNSTABLE: [persistAtomEffect],
});

export const tokenState = atom<string>({
  key: "token",
  default: "",
  effects_UNSTABLE: [persistAtomEffect],
});

export const quizState = atom<Master>({
  key: "quiz-data",
  default: null,
});
