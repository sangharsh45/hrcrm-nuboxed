import React, { Component,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { getLeadDetailsById } from "../../LeadsAction";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { withRouter } from "react-router";
import { BundleLoader } from "../../../../Components/Placeholder";
import LeadDetailHeader from "./LeadDetailHeader";
import LeadDetailLeft from "./LeadDetailLeft";
import LeadDetailRight from "./LeadDetailRight";
class LeadDetails extends Component {
  componentDidMount() {
    this.props.getLeadDetailsById(this.props.match.params.leadsId);
  }
  render() {
    const { lead, fetchingLeadDetailsById } = this.props;
    return (
      <>
        <>
          <LeadDetailHeader />
          {fetchingLeadDetailsById ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : 
          (
              <div>
                <Suspense fallback={"Loading..."}>
                <div class=" flex flex-nowrap w-full">
                    <div class=" w-1/4">
                      <LeadDetailLeft lead={lead} />
                    </div>
                    <div class=" w-3/4">
                      <LeadDetailRight lead={lead} />
                    </div> 
                  </div>
                </Suspense>
              </div>
            )}
        </>
      </>
    );
  }
}
const mapStateToProps = ({ leads }) => ({
    fetchingLeadDetailsById: leads.fetchingLeadDetailsById,
    lead: leads.lead,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getLeadDetailsById,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeadDetails)
);
