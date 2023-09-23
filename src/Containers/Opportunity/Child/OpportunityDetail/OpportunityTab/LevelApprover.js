import React, { Component } from "react";
import { Select } from "antd";

const { Option } = Select;
export default class LevelApprover extends Component {
  onChange = (value) => {
    this.props.changeApproverOwner(value);
  };
  render() {
    return (
      <div>
        {this.props.starter ? (
          <Select
            value={this.props.value || undefined}
            showSearch
            style={{ width: 100 }}
            disabled={this.props.disabled}
            placeholder="Select"
            // onChange={this.onChange}
            // onSelect={this.onChange}
          >
            {this.props.level1.map((item) => {
              return <Option value={item.userId}>{item.firstName}</Option>;
            })}
          </Select>
        ) : (
          <Select
            value={this.props.value || undefined}
            showSearch
            style={{ width: 100 }}
            disabled={this.props.disabled}
            placeholder="Select"
            // onChange={this.onChange}
            onSelect={this.onChange}
          >
            {this.props.level1.map((item) => {
              return <Option value={item.userId}>{item.firstName}</Option>;
            })}
          </Select>
        )}
      </div>
    );
  }
}
