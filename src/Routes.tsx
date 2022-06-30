import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { routes } from "./constants/routes";
import { PATH_HOME, PATH_LOGIN } from "./constants/paths";
import { useAtom } from "jotai";
import { isLoginAtom } from "./store/user/atoms";
import Home from "pages/Home";

const Routes = () => {
  const [isLogin] = useAtom(isLoginAtom);

  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({ component, path }, index) => {
          return (
            <Route
              exact={path === PATH_HOME}
              path={path}
              component={isLogin ? component : Home}
              key={index}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
