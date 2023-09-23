import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MainWrapper } from "../../../../../Components/UI/Layout";
import { LineChart_ } from "../../../../../Components/Charts";
// import { getHistoricalProposalAmount } from "../../../OpportunityAction";
import { BundleLoader } from "../../../../../Components/Placeholder";
class HistoricalProposalAmount extends Component {
  // componentDidMount() {
  //   this.props.getHistoricalProposalAmount(
  //     this.props.opportunity.opportunityId
  //   );
  // }
  render() {
    const {
      fetchingHistoricalProposalAmount,
      historicalProposalAmount
    } = this.props;
    return (
      <MainWrapper>
        {/* {fetchingHistoricalProposalAmount ? (
          <BundleLoader />
        ) : (
          <LineChart_
            width={320}
            height={230}
            data={historicalProposalAmount}
          />
        )} */}
      </MainWrapper>
    );
  }
}
const mapStateToProps = ({ opportunity }) => ({
  // fetchingHistoricalProposalAmount:
  //   opportunity.fetchingHistoricalProposalAmount,
  // fetchingHistoricalProposalAmountError:
  //   opportunity.fetchingHistoricalProposalAmountError,
  // historicalProposalAmount: opportunity.historicalProposalAmount
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // getHistoricalProposalAmount
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoricalProposalAmount);
