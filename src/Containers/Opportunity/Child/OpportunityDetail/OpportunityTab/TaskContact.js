import React, { Component } from "react";

import { Select, Popconfirm, message } from "antd";

const { Option } = Select;
function cancel(e) {
  console.log(e);
  // message.error('Click on No');
}

export default class TaskContact extends Component {
  onChange = (value) => {
    this.props.taggedContact(value);
  };
  render() {
    return (
      <div>
        <Select
          value={this.props.value || undefined}
          showSearch
          disabled={!this.props.disabled}
          style={{ width: 90 }}
          placeholder="Select a user"
          // onChange={this.onChange}
          onSelect={this.onChange}
        >
          {this.props.contact.map((item) => {
            return <Option value={item.contactId}>{item.firstName}</Option>;
          })}
        </Select>
      </div>
    );
  }
}
