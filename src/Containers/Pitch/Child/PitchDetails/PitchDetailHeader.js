import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../../Components/Utils";
import PitchDetailActionLeft from "./PitchDetailActionLeft";


class PitchDetailHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={<PitchDetailActionLeft />}
          rightComponent={<></>}
        />
      </div>
    );
  }
}

export default PitchDetailHeader;
