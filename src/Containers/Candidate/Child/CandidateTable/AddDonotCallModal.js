import React, { lazy, Suspense } from "react";
import { StyledModal } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const DonotCallForm = lazy(() => import("../CandidateTable/DonotCallForm"));

const AddDonotCallModal = props => {
    // console.log("call",props.candidateId)
  const { addDonotCallModal, handleDonotCallModal, ...formProps } = props;
  console.log("cnd",props.candidateId)
  return (
    <>
      <StyledModal
     title="Call Scheduler"
        width="60%"
        visible={addDonotCallModal}
        onCancel={() => handleDonotCallModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <DonotCallForm 
     candidateId={props.candidateId}
        //   handleSetCurrentCandidateId={props.handleSetCurrentCandidateId} 
          />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddDonotCallModal;
