import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../../Components/Utils";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const DealDetailActionLeft = lazy(() => import("./DealDetailActionLeft"));
class DealDetailHeader extends Component {
  render() {
    const { opportunity, fetchingOpportunityById } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <>
              <DealDetailActionLeft
                             />
              {/* <OpportunityStatsCard opportunity={opportunity} /> */}
            </>
          }
        //   rightComponent={
        //     <>
        //       <OpportunityDetailActionRight
        //         opportunity={this.props.opportunity}
        //       />
        //     </>
        //   }
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
)(DealDetailHeader);
