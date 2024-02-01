import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
const ReportActionLeft =lazy(()=> import("./ReportActionLeft"));
const ReportActionRight =lazy(()=> import("./ReportActionRight"));
class ReportHeader extends Component {
  render() {
    const {} = this.props;
    return (
      <div >
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
