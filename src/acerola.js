import React from "react";
import ReactDOM from "react-dom";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import "./styles/reset.css"
import "./styles/acerola.scss"
import Header from "./scripts/header";

class Layout extends React.Component {
  render() {
    return (
      <Router>
        <Link to="/About">About</Link>
        <Route exact path='/About' component={Header}/>
      </Router>
    );
  }
}

ReactDOM.render(<Layout/>, document.body);