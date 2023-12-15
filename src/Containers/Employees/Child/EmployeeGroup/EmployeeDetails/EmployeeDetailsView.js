import {  } from "enzyme";
import React, { Component } from "react";
import { Link } from "../../../../../Components/Common";

class EmployeeDetailsView extends Component {
  render() {
    return (
      <>
        <Link
          toUrl={`employee/${this.props.employeeId}`}
          title={`${this.props.fullName} `}
        />
      </>
    );
  }
}
export default EmployeeDetailsView;
