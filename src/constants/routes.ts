import Home from "components/Home";
import { PATH_ACCOUNT, PATH_HOME } from "./paths";
import Account from "components/Account";

export const routes = [
  {
    path: PATH_HOME,
    component: Home,
  },
  {
    path: PATH_ACCOUNT,
    component: Account,
  },
];
