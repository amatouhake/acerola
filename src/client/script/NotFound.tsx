import React from "react";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
  render() {
    return (
      <div className="container-fluid p-5 bg-secondary">
        <div className="row">
        　<div className="col">
            <h1 className="display-4">404 Not Found</h1>
            <p className="lead">ページが見つかりませんでした</p>
            <hr className="my-4" />
            <Link to="" className="btn btn-primary" role="button">ホームに戻る</Link>
          </div>
        　<div className="col-5"></div>
        </div>
      </div>
    );
  }
}

export default NotFound;