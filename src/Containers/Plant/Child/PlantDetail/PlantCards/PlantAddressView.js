import React, { Component } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../Components/UI/Elements";

class PlantAddressView extends Component {
  render() {
    const {
      plant: { addresses },
    } = this.props;
    return (
      <>
        <PlantItemRow label="Street" value={addresses && addresses[0].street} />
        <PlantItemRow label="City" value={addresses && addresses[0].city} />
        <PlantItemRow label="State" value={addresses && addresses[0].state} />
        <PlantItemRow
          label="Pincode"
          value={addresses && addresses[0].pinCode}
        />
        <PlantItemRow
          label="Country"
          value={addresses && addresses[0].country}
        />
      </>
    );
  }
}
export default PlantAddressView;

const PlantItemRow = ({ label, value }) => {
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
