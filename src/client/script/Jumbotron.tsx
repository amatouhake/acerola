import React from "react";

class Jumbotron extends React.Component {
  render() {
    return (
      <div className="container-fluid bg-secondary p-5">
        <h1 className="display-4">{this.props.title}</h1>
        <p className="lead">{this.props.subtitle}</p>
        <hr className="my-4" />
        <p>{this.props.content}</p>
      </div>
    );
  }
}

export default Jumbotron;