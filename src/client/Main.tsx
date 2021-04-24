import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style/Reset";
import "./style/Main";
import Header from "./script/Header";

class Layout extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Route exact path='/' component={Header}/>
      </Router>
    );
  }
}

ReactDOM.render(<Layout/>, document.body);