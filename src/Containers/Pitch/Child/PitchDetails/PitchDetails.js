import React, { Component,Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { getPitchDetailsById } from "../../PitchAction";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { withRouter } from "react-router";
import { BundleLoader } from "../../../../Components/Placeholder";
const PitchDetailHeader =lazy(()=>import("./PitchDetailHeader"));
const PitchDetailLeft =lazy(()=>import("./PitchDetailLeft"));
const PitchDetailRight =lazy(()=>import("./PitchDetailRight"));
class PitchDetails extends Component {
  componentDidMount() {
    this.props.getPitchDetailsById(this.props.match.params.investorLeadsId);
  }
  render() {
     const { pitch, fetchingPitchDetailsById } = this.props;
    return (
      <>
        <>
          <PitchDetailHeader />
          {fetchingPitchDetailsById ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
           ) :  
           ( 
              <div>
                <Suspense fallback={"Loading..."}>
                <div class=" flex flex-nowrap w-full">
                    <div class=" w-1/4">
                      <PitchDetailLeft 
                      pitch={pitch} />
                    </div>
                    <div class=" w-3/4">
                      <PitchDetailRight 
                       pitch={pitch}
                       />
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
const mapStateToProps = ({ pitch }) => ({
    fetchingPitchDetailsById:pitch.fetchingPitchDetailsById,
    pitch:pitch.pitch,
    // fetchingLeadDetailsById: leads.fetchingLeadDetailsById,
    // lead: leads.lead,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getPitchDetailsById,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PitchDetails)
);
