import React, { Component } from "react";
import { ActionHeader } from "../../../../../Components/Utils";
import EmployeeDetailActionLeft from "./EmployeeDetailActionLeft";

class EmployeeDetailHeader extends Component {
  render() {
    return (
      <div style={{zIndex: "999",
        position: "sticky",
        top: "3rem"}}>
        <ActionHeader
          leftComponent={<EmployeeDetailActionLeft />}
          rightComponent={<></>}
        />
      </div>
    );
  }
}

export default EmployeeDetailHeader;
