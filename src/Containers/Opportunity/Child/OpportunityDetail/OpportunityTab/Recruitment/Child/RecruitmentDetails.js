import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import {
  FlexContainer,
  MainWrapper,
} from "../../../../../../../Components/UI/Layout";

const RecruitmentDetailsLeft = lazy(() => import("./RecruitmentDetailsLeft"));
const RecruitmentDetailsRight = lazy(() => import("./RecruitmentDetailsRight"));

class RecruitmentDetails extends Component {
  render() {
    console.log(this.props.stageList);
    console.log("Detail",this.props.candidateId);
    return (
      <>
        {this.props.fetchingCandidateById ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
            <FlexContainer>
              <Suspense fallback={"Loading..."}>
                <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                  <div style={{ width: "100%" }}>
                    <RecruitmentDetailsLeft 
                    candidate={this.props.candidate}
                    candidateId={this.props.candidateId}
                    stageList={this.props.stageList}
                    profileId={this.props.profileId}
                    />
                  </div>
                  {/* <div style={{ width: "75%" }}>
                    <RecruitmentDetailsRight
                      candidate={this.props.candidate}
                      stageList={this.props.stageList}
                      profileId={this.props.profileId}
                    />
                  </div> */}
                </FlexContainer>
              </Suspense>
            </FlexContainer>
          )}
      </>
    );
  }
}
const mappropsToProps = ({ candidate }) => ({
  fetchingCandidateById: candidate.fetchingCandidateById,
  
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mappropsToProps, mapDispatchToProps)(RecruitmentDetails);
