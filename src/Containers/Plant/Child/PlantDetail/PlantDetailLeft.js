import React, { Component } from "react";
import { FlexContainer } from "../../../../Components/UI/Layout";
import PlantOverviewCard from "./PlantCards/PlantOverViewCard";
import PlantDetailCard from "./PlantCards/PlantDetailCard";
import PlantAddressViewCard from "./PlantCards/PlantAddressViewCard";

class PlantDetailLeft extends Component {
  render() {
    const { plant } = this.props;
    return (
      <>
        <FlexContainer flexDirection="column" style={{ display: "block" }}>
          <PlantOverviewCard plant={plant} />
          <PlantDetailCard plant={plant} />
          <PlantAddressViewCard plant={plant} />
        </FlexContainer>
      </>
    );
  }
}
export default PlantDetailLeft;
