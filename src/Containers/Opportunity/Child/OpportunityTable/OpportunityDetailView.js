import React, { Component, PureComponent } from "react";
import { Link } from "../../../../Components/Common";
class OpportunityDetailView extends PureComponent {
  render() {
    return (
      <>
        <Link
          toUrl={`opportunity/${this.props.opportunityId}`}
          title={`${this.props.opportunityName}`}
        />
      </>
    );
  }
}
export default OpportunityDetailView;
