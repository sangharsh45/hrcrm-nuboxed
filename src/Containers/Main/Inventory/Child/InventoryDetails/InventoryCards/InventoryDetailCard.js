import React, { Component } from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
import InventoryDetailView from "./InventoryDetailView";

class InventoryDetailCard extends Component {
  render() {
    const { inventory } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <InventoryDetailView
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

export default InventoryDetailCard;
