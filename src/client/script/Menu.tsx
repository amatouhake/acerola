import React from "react";
import { Link } from "react-router-dom";

class Menu extends React.Component {
  render() {
    return (
      <div className="container-fluid p-4">
        <h1 className="display-6">Menu</h1>
        <div className="row">
          <a href="Chat" className="col text-decoration-none text-reset">
            <div className="app card">
              <div className="card-body">
                <h5 className="card-title">チャット</h5>
                <h6 className="card-subtitle text-muted">Communication</h6>
              </div>
            </div>
          </a>
          <Link to="Game" className="col text-decoration-none text-reset">
            <div className="app card">
              <div className="card-body">
                <h5 className="card-title">弾幕</h5>
                <h6 className="card-subtitle text-muted">Game</h6>
              </div>
            </div>
          </Link>
          <a href="Breakout" className="col text-decoration-none text-reset">
            <div className="app card">
              <div className="card-body">
                <h5 className="card-title">ブロック崩し</h5>
                <h6 className="card-subtitle text-muted">Game</h6>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default Menu;