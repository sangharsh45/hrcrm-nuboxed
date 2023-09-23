import React, { Component } from "react";
import { Icon } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
class ShowOrCollapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true
    };
  }
  toggleCollapse = () => {
    this.setState(prevState => {
      if (prevState.isCollapsed === true) {
        return { isCollapsed: false };
      } else {
        return { isCollapsed: true };
      }
    });
  };
  render() {
    const { isCollapsed } = this.state;
    return (
      <>
        <a
          className="ant-dropdown-link"
          href="#"
          onClick={this.toggleCollapse}
          style={{ textDecoration: "none", fontSize: 15 }}
        >
          {isCollapsed && <DownOutlined type="down" />}
          {isCollapsed && " Show more "}
          {!isCollapsed && <UpOutlined type="up" style={{ fontSize: 11 }} />}
          {!isCollapsed && " Show less "}
        </a>
        <div style={{ marginTop: 15 }}>
          {this.props.children(isCollapsed, this.toggleCollapse)}
        </div>
      </>
    );
  }
}

export default ShowOrCollapse;
