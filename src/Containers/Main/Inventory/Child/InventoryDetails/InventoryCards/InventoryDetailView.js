import React, { Component } from "react";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../../Components/UI/Elements";

class InventoryDetailView extends Component {
  render() {
    const {
      inventory: { managementDetails, productionManagerDetails },
    } = this.props;
    return (
      <>
        <InventoryItemRow
          label="Management"
          value={`${managementDetails && managementDetails.firstName}`}
        />
        <InventoryItemRow
          label="Production Manager"
          value={`${productionManagerDetails &&
            productionManagerDetails.firstName} ${productionManagerDetails &&productionManagerDetails.lastName}`}
        />
        {/* <InventoryItemRow label="Email" value={emailId} />
        <InventoryItemRow label="Source" value={Inventory} /> */}
      </>
    );
  }
}
export default InventoryDetailView;

const InventoryItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ textOverflow: "ellipsis" }}>{value}</SubTitle>
    </FlexContainer>
  );
};
