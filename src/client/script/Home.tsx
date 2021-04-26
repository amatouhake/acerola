import React from "react";
import Jumbotron from "./Jumbotron";
import Menu from "./Menu";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron />
        <Menu />
      </div>
    );
  }
}

export default Navbar;