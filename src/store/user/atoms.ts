import { atom } from "jotai";
import { isLoginState } from "./initialStates";
import { getItem } from "../../utils/localStorage";
import { AUTHENTICATION_TOKEN } from "constants/localStorages";

export const isLoginAtom = atom(getItem(AUTHENTICATION_TOKEN) || isLoginState);
