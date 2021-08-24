import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./App";
import Painel from "./pages/Painel";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/painel" component={Painel} />
      </Switch>
    </BrowserRouter>
  );
}
