import React, { Component } from "react";
import { FlexContainer } from "../../../../../../Components/UI/Layout";

class SupplierOverDetailView extends Component {
  render() {
    console.log(this.props.supplier);
    const {
        supplier: { addresses },
      toggleViewType,
    } = this.props;
    const { shipper } = this.props;

    return (
      <>
        <ShipperItemRow
          label="Street"
          value={addresses && addresses[0].street}
        />
        <ShipperItemRow label="City" value={addresses && addresses[0].city} />
        <ShipperItemRow label="State" value={addresses && addresses[0].state} />
        <ShipperItemRow
          label="Pincode"
          value={addresses && addresses[0].pinCode}
        />
        <ShipperItemRow
          label="Country"
          value={addresses && addresses[0].country}
        />
      </>
    );
  }
}
export default SupplierOverDetailView;

const ShipperItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem", fontSize: "13px" }}
    >
      <div
        style={{
          color: "#444",
          fontWeight: 600,
          width: "40%",
        }}
      >
        {label}
      </div>
      <div
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "61%",
        }}
      >
        {value}
      </div>
    </FlexContainer>
  );
};
