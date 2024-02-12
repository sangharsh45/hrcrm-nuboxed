import React, { Component, lazy } from "react";
import { ActionHeader } from "../../../../../Components/Utils";
const InventoryDetailActionLeft = lazy(() => import("./InventoryDetailActionLeft"));

class InventoryDetailHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={
            <InventoryDetailActionLeft
              inventoryViewType={this.props.inventoryViewType}
              setInventoryDetailViewType={this.props.setInventoryDetailViewType}
              inventory={this.props.inventory}
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
