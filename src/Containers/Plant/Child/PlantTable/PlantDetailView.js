import React, { Component } from "react";
import { Link } from "../../../../Components/Common";

class PlantDetailView extends Component {
  render() {
    console.log(
      "locationDetailsId",
      this.props.locationDetailsId,
      this.props.plantName
    );
    return (
      <>
        <Link
          toUrl={`/plant/${this.props.locationDetailsId}`}
          title={`${this.props.plantName}`}
        />
      </>
    );
  }
}
export default PlantDetailView;
