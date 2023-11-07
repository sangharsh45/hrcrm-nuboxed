import React, { Component } from "react";
import { ActionHeader } from "../../../../../Components/Utils";
import InventoryDetailActionLeft from "./InventoryDetailActionLeft";

class InventoryDetailHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={
            <InventoryDetailActionLeft
              handleResetTab={this.props.handleResetTab}
            />
          }
          rightComponent={<></>}
        />
      </div>
    );
  }
}

export default InventoryDetailHeader;
