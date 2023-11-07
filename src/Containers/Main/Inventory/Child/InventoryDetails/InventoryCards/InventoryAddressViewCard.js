import React, { Component } from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
import InventoryAddressView from "./InventoryAddressView";

class InventoryAddressViewCard extends Component {
  render() {
    const { inventory } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <InventoryAddressView
                inventory={inventory}
                toggleViewType={toggleViewType}
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default InventoryAddressViewCard;
