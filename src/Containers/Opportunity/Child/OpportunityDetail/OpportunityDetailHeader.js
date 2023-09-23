import React, { Component } from "react";
import { ActionHeader } from "../../../../Components/Utils";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OpportunityStatsCard from "./OpportunityCards/OpportunityStatsCard";
import OpportunityDetailActionLeft from "./OpportunityDetailActionLeft";
import OpportunityDetailActionRight from "./OpportunityDetailActionRight";

class OpportunityDetailHeader extends Component {
  render() {
    const { opportunity, fetchingOpportunityById } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <>
              <OpportunityDetailActionLeft
                opportunity={opportunity}
                fetchingOpportunityById={fetchingOpportunityById}
              />
              {/* <OpportunityStatsCard opportunity={opportunity} /> */}
            </>
          }
          rightComponent={
            <>
              <OpportunityDetailActionRight
                opportunity={this.props.opportunity}
              />
            </>
          }
        />
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, account }) => ({
  opportunity: opportunity.opportunity,
  // fetchingAccountById: account.fetchingAccountById,
  // account: account.account,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityDetailHeader);
