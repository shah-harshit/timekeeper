import React from "react";
import { Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { ScreenAPage } from "../pages/screen-a-page/screen-a-page.component";
import { ScreenBPage } from "../pages/screen-b-page/screen-b-page.component";
import { ScreenCPage } from "../pages/screen-c-page/screen-c-page.component";

export const AppRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/screen-a" component={ScreenAPage} />
        <Route exact path="/screen-b" component={ScreenBPage} />
        <Route exact path="/screen-c" component={ScreenCPage} />

        {/* Direct all other paths to Screen A */}
        <Redirect from="/" to="/screen-a" />
      </Switch>
    </>
  );
};
