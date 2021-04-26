import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="container-fluid navbar navbar-expand-sm navbar-dark bg-dark">
        <Link to="" className="navbar-brand">
          <i className="fas fa-seedling mx-2"></i>
          Acerola
        </Link>
      </nav>
    );
  }
}

export default Navbar;