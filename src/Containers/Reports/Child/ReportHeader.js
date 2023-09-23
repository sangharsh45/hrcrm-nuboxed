import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
// import ReportActionRight from "./OrganizationView/ReportActionRight";
import ReportActionLeft from "./ReportActionLeft";
import ReportActionRight from "./ReportActionRight";
class ReportHeader extends Component {
  render() {
    const {} = this.props;
    return (
      <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
        <ActionHeader
          leftComponent={<ReportActionLeft />}
          rightComponent={<ReportActionRight />}
          // rightComponent={<ReportActionRight
          // />}
        />
      </div>
    );
  }
}

export default ReportHeader;
