import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../../Components/Utils";
import LeadDetailActionLeft from "./LeadDetailActionLeft";


class LeadDetailHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={<LeadDetailActionLeft />}
          rightComponent={<></>}
        />
      </div>
    );
  }
}

export default LeadDetailHeader;
