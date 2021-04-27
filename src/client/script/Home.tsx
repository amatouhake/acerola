import React from "react";
import Jumbotron from "./Jumbotron";
import Menu from "./Menu";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron title="Home" subtitle="ホーム" content="チャットやゲームなどのページを選択するページです" />
        <Menu />
      </div>
    );
  }
}

export default Home;