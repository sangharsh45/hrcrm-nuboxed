import React, { Component } from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
import InventoryOverView from "./InventoryOverView";

class InventoryOverViewCard extends Component {
  render() {
    const { inventory } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <InventoryOverView inventory={inventory} />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default InventoryOverViewCard;
