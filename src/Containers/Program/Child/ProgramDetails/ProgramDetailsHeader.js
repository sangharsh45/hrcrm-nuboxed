import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../../Components/Utils";
import ProgramDetailActionLeft from "./ProgramDetailActionLeft";

class ProgramDetailsHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={<ProgramDetailActionLeft />}
          rightComponent={<></>}
        />
      </div>
    );
  }
}

export default ProgramDetailsHeader;
