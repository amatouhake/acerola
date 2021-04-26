import React from "react";

class Navbar extends React.Component {
  render() {
    return (
      <div className="container-fluid p-5 bg-secondary">
        <div className="row">
        　<div className="col">
            <h1 className="display-4">Home</h1>
            <p className="lead">ホームページ</p>
            <hr className="my-4" />
            <p>チャットやゲームなどのページを選択するページです</p>
          </div>
        　<div className="col-5">
            <div className="card shadow-small">
              <div className="card-body">
                <h5 className="card-title">ブロック崩し</h5>
                <h6 className="card-subtitle text-muted">新しいアプリ</h6>
                <p className="card-text my-2">ブロックを崩すゲームです</p>
                <a href="Breakout" className="card-link">開く</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;