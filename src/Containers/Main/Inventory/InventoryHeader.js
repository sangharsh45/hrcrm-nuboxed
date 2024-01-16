import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
const InventoryActionLeft =lazy(()=>import("./InventoryActionLeft"));
class InventoryHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={
            <InventoryActionLeft
              viewType={this.props.viewType}
              setInventoryViewType={this.props.setInventoryViewType}
            />
          }
          // rightComponent={<InventoryActionRight />}
        />
      </div>
    );
  }
}

export default InventoryHeader;
