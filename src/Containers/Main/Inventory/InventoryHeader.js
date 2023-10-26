import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
// import InventoryActionRight from "./InventoryActionRight";
import InventoryActionLeft from "./InventoryActionLeft";
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
