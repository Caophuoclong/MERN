import React, { Component } from "react";

class Xe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brand: "",
      color: props.color,
      content: props.content
    };
  }
  event = (e) => {
    this.setState({ brand: e.target.value });
  };
  render() {
    return (
      <div>
        <input value={this.state.brand} onChange={this.event}/>
        <h1 style={{ color: this.state.color }}>
          {" "}
          {this.state.content} + {this.state.brand}
        </h1>
      </div>
    );
  }
}

export default Xe;
