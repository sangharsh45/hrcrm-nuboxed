import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const ResumeForm = lazy(() => import("./ResumeForm"));

const AddCandidateResumeModal = (props) => {
  const { addCandidateResumeModal, handleCandidateResumeModal,
    //  ...formProps 
    } =
    props;

  return (
    <>
      <StyledDrawer
        title={<FormattedMessage id="app.resume" defaultMessage="Resume" />}
        width="60%"
        visible={addCandidateResumeModal}
        onClose={() => handleCandidateResumeModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ResumeForm
            addCandidateResumeModal={props.addCandidateResumeModal}
            handleResponseData={props.handleResponseData}
            responseData={props.responseData}
            // {...formProps}
          />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCandidateResumeModal;
