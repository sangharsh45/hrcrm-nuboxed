import React, { Component } from "react";
import { Link } from "../../../Components/Common";


class InventoryDetailView extends Component {
  render() {
    console.log(
      "locationDetailsId",
      this.props.locationDetailsId,
      this.props.inventoryName
    );
    return (
      <>
        <Link
     
          toUrl={`/locationDetails/${this.props.locationDetailsId}`}
          title={`${this.props.inventoryName}`}
        />
      </>
    );
  }
}
export default InventoryDetailView;
