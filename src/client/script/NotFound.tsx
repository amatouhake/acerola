import React from "react";
import { Link } from "react-router-dom";
import Jumbotron from "./Jumbotron";

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron title="404 Error" subtitle="Not Found" content="ページが見つかりませんでした" />
        <div className="container-fluid p-4">
          <Link to="" className="btn btn-primary" role="button">
            <i className="fas fa-long-arrow-alt-left me-2"></i>
            ホームに戻る
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFound;