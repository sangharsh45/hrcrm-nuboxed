import React, { Component } from "react";
import SupplierDetailCard from "./SupplierCard/SupplierDetailCard";
import SupplierOverViewCard from "./SupplierCard/SupplierOverViewCard";
import SupplierOverViewDetailCard from "./SupplierCard/SupplierOverViewDetailCard";

class SupplierDetailsLeft extends Component {
  render() {
    const { supplier } = this.props;
    return (
      <>
        <div class="flex-col block">
          <SupplierOverViewCard  supplier={supplier}/>
          <SupplierDetailCard supplier={supplier} />
          <SupplierOverViewDetailCard supplier={supplier} />
        </div>
      </>
    );
  }
}
export default SupplierDetailsLeft;
