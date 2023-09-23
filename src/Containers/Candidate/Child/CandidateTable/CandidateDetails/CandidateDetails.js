import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CandidateDetailHeader from "./CandidateDetailHeader";
import {
  FlexContainer,
  MainWrapper,
} from "../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { getCandidateById } from "../../../CandidateAction";
const CandidateDetailLeft = lazy(() => import("./CandidateDetailLeft"));
const CandidateDetailRight = lazy(() => import("./CandidateDetailRight"));

class CandidateDetails extends Component {
  componentDidMount() {
    this.props.getCandidateById(this.props.match.params.candidateId);
  }

  render() {
    const { candidate, fetchingCandidateById } = this.props;
    console.log(this.props.candidateId);
    return (
      <>
        <CandidateDetailHeader />
        {fetchingCandidateById ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
          <FlexContainer>
            <Suspense fallback={""}>
              <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                <div style={{ width: "25%" }}>
                  <CandidateDetailLeft 
                  candidate ={candidate}
                  selectedLanguage={this.props.selectedLanguage}
                  />
                </div>
                <div style={{ width: "75%" }}>
                  <CandidateDetailRight 
                  candidate={candidate}
                  selectedLanguage={this.props.selectedLanguage}

                  />
                </div>
              </FlexContainer>
            </Suspense>
          </FlexContainer>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ candidate }) => ({
  fetchingCandidateById: candidate.fetchingCandidateById,
  candidate: candidate.candidate,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
      getCandidateById,
    }, 
    dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDetails);
