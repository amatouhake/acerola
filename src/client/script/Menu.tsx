import React from "react";
import { Link } from "react-router-dom";

class Menu extends React.Component {
  render() {
    return (
      <div className="container-fluid p-4">
        <h1 className="display-6">Menu</h1>
        <ul className="list-group">
          <Link to="Chat" className="text-decoration-none">
            <li className="list-group-item list-group-item-action rounded shadow-sm m-2 text-center ">
              チャット
            </li>
          </Link>
          <Link to="Danmaku" className="text-decoration-none">
            <li className="list-group-item list-group-item-action rounded shadow-sm m-2 text-center">
              弾幕
            </li>
          </Link>
          <a href="Breakout" className="text-decoration-none">
            <li className="list-group-item list-group-item-action rounded shadow-sm m-2 text-center">
              ブロック崩し
            </li>
          </a>
        </ul>
      </div>
    );
  }
}

export default Menu;