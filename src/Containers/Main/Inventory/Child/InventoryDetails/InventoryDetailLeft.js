import React, { Component } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import InventoryOverviewCard from "./InventoryCards/InventoryOverViewCard";
import InventoryDetailCard from "./InventoryCards/InventoryDetailCard";
import InventoryAddressViewCard from "./InventoryCards/InventoryAddressViewCard";

class InventoryDetailLeft extends Component {
  render() {
    const { inventory } = this.props;
    return (
      <>
        <FlexContainer flexDirection="column" style={{ display: "block" }}>
          <InventoryOverviewCard inventory={inventory} />
          <InventoryDetailCard inventory={inventory} />
          <InventoryAddressViewCard inventory={inventory} />
        </FlexContainer>
      </>
    );
  }
}
export default InventoryDetailLeft;
