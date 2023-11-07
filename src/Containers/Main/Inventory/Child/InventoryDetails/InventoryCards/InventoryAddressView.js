import React, { Component } from "react";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../../Components/UI/Elements";

class InventoryAddressView extends Component {
  render() {
    const {
      inventory: { address },
    } = this.props;
    return (
      <>
        <InventoryItemRow
          label="Street"
          value={address && address[0].street}
        />
        <InventoryItemRow label="City" value={address && address[0].city} />
        <InventoryItemRow
          label="State"
          value={address && address[0].state}
        />
        <InventoryItemRow
          label="Pincode"
          value={address && address[0].postalCode}
        />
        <InventoryItemRow
          label="Country"
          value={address && address[0].country}
        />
      </>
    );
  }
}
export default InventoryAddressView;

const InventoryItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-30px", textOverflow: "ellipsis" }}>
        {value}
      </SubTitle>
    </FlexContainer>
  );
};
