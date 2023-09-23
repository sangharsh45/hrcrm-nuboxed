import React, { Component } from "react";
import { MainWrapper } from "../Layout";

class ViewEditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: "view",
    };
  }
  toggleViewType = () => {
    this.setState((prevState) => {
      if (prevState.viewType === "view") {
        return { viewType: "edit" };
      } else {
        return { viewType: "view" };
      }
    });
  };
  render() {
    return (
      <MainWrapper Height={this.props.Height}>
        {this.props.children(this.state, this.toggleViewType)}
      </MainWrapper>
    );
  }
}

export default ViewEditCard;
