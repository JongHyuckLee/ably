import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routes } from "./constants/routes";
import { PATH_HOME } from "./constants/paths";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({ component, path }) => {
          return (
            <Route
              exact={path === PATH_HOME}
              path={path}
              component={component}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
