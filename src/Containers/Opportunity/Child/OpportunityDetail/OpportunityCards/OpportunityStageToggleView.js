import React, { Component } from "react";
import OpportunityStageRow from "./OpportunityStageRow";
class OpportunityStageToggleView extends Component {
  render() {
    return (
      <>
        <div style={{ height: "12.5em" }}>
          <OpportunityStageRow opportunity={this.props.opportunity} />
        </div>
      </>
    );
  }
}
export default OpportunityStageToggleView;
