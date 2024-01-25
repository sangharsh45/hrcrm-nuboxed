import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setEditCandidate } from "../../CandidateAction";
const UpdateCandidateForm = lazy(() => import("./UpdateCandidateForm"));

const UpdateCandidateModal = props => {
  const { updateCandidateModal, handleUpdateCandidateModal, ...formProps } = props;
  console.log("cn",props.candidateId )
  console.log("dn",props.setEditingCandidate.fullName)
  return (
    <>
      <StyledDrawer
        title={props.setEditingCandidate.fullName}
        width="60%"
        visible={updateCandidateModal}
        onClose={() => handleUpdateCandidateModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateCandidateForm 
          candidateId={props.candidateId}
          handleSetCurrentCandidateId={props.handleSetCurrentCandidateId} 
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

const mapStateToProps = ({ auth, candidate, }) => ({
  setEditingCandidate: candidate.setEditingCandidate,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  candidateByUserId: candidate.candidateByUserId,
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
      setEditCandidate
      
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCandidateModal);
