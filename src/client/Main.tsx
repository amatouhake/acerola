import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
//import "./style/Reset";
import "./style/Main";
import Navbar from "./script/Navbar";
import Home from "./script/Home";
import NotFound from "./script/NotFound";

class Layout extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Layout />, document.body);