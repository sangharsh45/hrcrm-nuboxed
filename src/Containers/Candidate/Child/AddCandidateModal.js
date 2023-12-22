import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const CandidateForm = lazy(() => import("./CandidateForm"));

const AddCandidateModal = props => {
  const { addCandidateModal, handleCandidateModal,responseData, } = props;
  return (
    <>
      <StyledDrawer
        //title="Candidate"
        title={<FormattedMessage
          id="app.candidate"
          defaultMessage="Candidate"
        />}
        width="60%"
        visible={addCandidateModal}
        closable
        // maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"3rem"}}
        onClose={() => handleCandidateModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CandidateForm
           responseData={responseData} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCandidateModal;
