import React, { Component } from "react";
import { ActionHeader } from "../../../../Components/Utils";
import PlantDetailActionLeft from "./PlantDetailActionLeft";

class PlantDetailHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={<PlantDetailActionLeft />}
          rightComponent={<></>}
        />
      </div>
    );
  }
}

export default PlantDetailHeader;
