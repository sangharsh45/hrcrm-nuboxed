import React, { Component } from "react";
import { Link } from "../../../../Components/Common";
class LeadsDetailView extends Component {
  render() {
    console.log("customerId", this.props.customerId);
    return (
      <>
        <Link
          toUrl={`leads/${this.props.leadsId}`}
          title={`${this.props.name}`}
        />
      </>
    );
  }
}
export default LeadsDetailView;
