import Home from "components/Home";
import { PATH_ACCOUNT, PATH_HOME, PATH_RESET } from "./paths";
import Account from "pages/Account";
import Reset from "pages/Reset";

export const routes = [
  {
    path: PATH_HOME,
    component: Home,
  },
  {
    path: PATH_ACCOUNT,
    component: Account,
  },
  {
    path: PATH_RESET,
    component: Reset,
  },
];
