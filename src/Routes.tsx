import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routes } from "./constants/routes";
import { PATH_HOME } from "./constants/paths";

import Layout from "./components/Common/Layout";

const Routes = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          {routes.map(({ component, path }, index) => {
            return (
              <Route
                exact={path === PATH_HOME}
                path={path}
                component={component}
                key={index}
              />
            );
          })}
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
