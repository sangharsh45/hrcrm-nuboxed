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
        // title={<FormattedMessage
        //   id="app.updatecandidate"
        //   defaultMessage="Candidate"
        // />}
        width="60%"
        visible={addDonotCallModal}
        closable
        // maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"3rem"}}
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
