import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import UpdatePassword from "./containers/UpdatePassword";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";
import Store from './containers/Store';
import Classes from './containers/Classes';
import Blog from './containers/Blog';

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/updatepassword" exact component={UpdatePassword} appProps={appProps} />
      <AppliedRoute path="/store" component={Store} appProps={appProps} />
      <AppliedRoute path="/classes" component={Classes} appProps={appProps} />
      <AppliedRoute path="/blog/:slug" component={Blog} appProps={appProps} />
      <AppliedRoute path="/blog/" component={Blog} appProps={appProps} />
      {/* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
}
