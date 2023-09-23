import React, { Component } from "react";

import { Select, Popconfirm, message } from "antd";

const { Option } = Select;
function cancel(e) {
  console.log(e);
  // message.error('Click on No');
}

export default class LevelDepartment extends Component {
  onChange = (value) => {
    //debugger;
    this.props.changeLevelOwner(value);
  };
  render() {
    return (
      <div>
        {this.props.starter ? (
          <Select
            // dropdownStyle={{ backgroundColor: "green", width: "9.375em" }}
            value={this.props.value || undefined}
            showSearch
            disabled={!this.props.disabled}
            style={{ width: 100 }}
            placeholder="Select"
          // onChange={this.onChange}
          // onSelect={this.onChange}
          >
            {this.props.level.map((item) => {
              return <Option value={item.userId}>{item.firstName} </Option>;
            })}
          </Select>
        ) : (
            <Select
              // dropdownStyle={{ backgroundColor: "green", width: "9.375em" }}
              value={this.props.value || undefined}
              showSearch
              disabled={!this.props.disabled}
              style={{ width: 100 }}
              placeholder="Select"
              // onChange={this.onChange}
              onSelect={this.onChange}
            >
              {this.props.level.map((item) => {
                return <Option value={item.userId}>{item.firstName} </Option>;
              })}
            </Select>
          )}
      </div>
    );
  }
}
