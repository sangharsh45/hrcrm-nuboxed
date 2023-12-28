import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../../Components/Utils";
const PitchDetailActionLeft =lazy(()=>import("./PitchDetailActionLeft"));


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
