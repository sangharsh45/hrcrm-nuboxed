import React, { useEffect, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer, MainWrapper } from "../../../../Components/UI/Layout";
import { withRouter } from "react-router";
import { BundleLoader } from "../../../../Components/Placeholder";
import {getAssessmentById} from "../../AccessmentAction";
import AssessmentDetailsHeader from "./AssessmentDetailsTab/AssessmentDetailsHeader";
const AssessmenntDetailsLeft=lazy(()=>import("./AssessmentDetailsTab/AssessmentDetailsLeft"));
const AssessmentDetailsRight=lazy(()=>import("./AssessmentDetailsTab/AssessmentDetailsRight"));

function AssessmenntDetails(props) {
    useEffect(() => {
       props.getAssessmentById(props.match.params.assessmentId,props.match.params.assessmentName);
      }, {});
    const { assessmentByAssessmentId,fetchingAssessmentById } = props;  
  return (
    <>
    <AssessmentDetailsHeader assessmentId={props.assessmentId}
    assessmentName={props.assessmentName}
    assessmentByAssessmentId={props.assessmentByAssessmentId}/>
    {fetchingAssessmentById ? (
      <MainWrapper>
        <BundleLoader />
      </MainWrapper>
    ):(
      <FlexContainer>
        <Suspense fallback={"Loading..."}>
          <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
            <div style={{ width: "25%" }}>
              <AssessmenntDetailsLeft assessmentByAssessmentId={assessmentByAssessmentId} />
            </div>
            <div style={{ width: "75%" }}>
              <AssessmentDetailsRight assessmentByAssessmentId={assessmentByAssessmentId} />
            </div>
          </FlexContainer>
        </Suspense>
      </FlexContainer>
    )}
    </>
  );
}
const mapStateToProps = ({auth,assessment}) => ({
  assessmentByAssessmentId:assessment.assessmentByAssessmentId,
    userId: auth.userDetails.userId,
orgId: auth.userDetails.organizationId,
fetchingAssessmentById:assessment.fetchingAssessmentById,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getAssessmentById
}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AssessmenntDetails)
);
