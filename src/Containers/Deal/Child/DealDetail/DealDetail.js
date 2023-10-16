import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DealDetailHeader from "./DealDetailHeader";
import { FlexContainer, MainWrapper } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
import { getDealDetailById } from "../../DealAction";

const DealDetailLeft = lazy(() => import("./DealDetailLeft.js"));
// const DealDetailRight = lazy(() => import("./DealDetailRight"));

class DealDetail extends Component {
  componentDidMount() {
    this.props.getDealDetailById(this.props.match.params.invOpportunityId);
  }
  render() {
    const { dealDetailsbyID, fetchDealdetails } = this.props;
    // console.log(this.props.opportunity&&this.props.opportunity.recruiterDetails.length&&this.props.opportunity.recruiterDetails[0].fullName)
    return (
      <>
        <DealDetailHeader
          dealDetailsbyID={dealDetailsbyID}
          fetchDealdetails={fetchDealdetails}
        />
        {fetchDealdetails ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
          <FlexContainer>
            <Suspense fallback={""}>
              <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                <div style={{ width: "20%" }}>
                  <DealDetailLeft dealDetailsbyID={dealDetailsbyID} />
                </div>
                <div style={{ width: "80%" }}>
                  {/* <DealDetailRight 
                  dealDetailsbyID={dealDetailsbyID}
                  /> */}
                </div>
              </FlexContainer>
            </Suspense>
          </FlexContainer>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ deal, auth }) => ({
  fetchDealdetails: deal.fetchDealdetails,
  fetchDealdetailsfailure: deal.fetchDealdetailsfailure,
  dealDetailsbyID: deal.dealDetailsbyID,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
     getDealDetailById
     }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DealDetail);
