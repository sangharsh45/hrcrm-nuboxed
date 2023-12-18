import React, { Component } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import SupplierDetailCard from "./SupplierCard/SupplierDetailCard";
import SupplierOverViewCard from "./SupplierCard/SupplierOverViewCard";
import SupplierOverViewDetailCard from "./SupplierCard/SupplierOverViewDetailCard";

class SupplierDetailsLeft extends Component {
  render() {
    const { supplier } = this.props;
    return (
      <>
        <FlexContainer flexDirection="column" style={{ display: "block" }}>
          <SupplierOverViewCard  supplier={supplier}/>
          <SupplierDetailCard supplier={supplier} />
          <SupplierOverViewDetailCard supplier={supplier} />
        </FlexContainer>
      </>
    );
  }
}
export default SupplierDetailsLeft;
