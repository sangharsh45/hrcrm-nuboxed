import React, { Component } from "react";
import { Link } from "../../../../Components/Common";
class CustomerDetailView extends Component {
  render() {
    console.log("customerId", this.props.customerId);
    return (
      <>
        <Link
          toUrl={`customer/${this.props.customerId}`}
          title={`${this.props.name}`}
        />
      </>
    );
  }
}
export default CustomerDetailView;
