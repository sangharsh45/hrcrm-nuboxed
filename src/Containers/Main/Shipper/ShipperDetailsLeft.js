import React, { Component } from "react";
import { FlexContainer } from "../../../Components/UI/Layout";
// import ShipperOverViewCard from "./ShipperCards/ShipperOverViewCard";
// import ShipperDetailCard from "./ShipperCards/ShipperDetailCard";
// import ShipperOverViewDetailCard from "./ShipperCards/ShipperOverViewDetailCard";

class ShipperDetailLeft extends Component {
  render() {
    const { shipper } = this.props;
    return (
      <>
        <FlexContainer flexDirection="column" style={{ display: "block" }}>
          {/* <ShipperOverViewCard shipper={shipper} />
          <ShipperDetailCard shipper={shipper} />
          <ShipperOverViewDetailCard shipper={shipper} /> */}
        </FlexContainer>
      </>
    );
  }
}
export default ShipperDetailLeft;
