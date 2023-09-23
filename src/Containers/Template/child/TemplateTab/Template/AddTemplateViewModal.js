import React, { lazy, Suspense } from "react";
import { StyledModal } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
import TemplateView from "./TemplateView";
//const UpdateCandidateForm = lazy(() => import("./UpdateCandidateForm"));

const AddTemplateViewModal = props => {
  const { templateViewModal, handleTemplateViewModal, ...formProps } = props;
  return (
    <>
      <StyledModal
         title="Template"
        // title={<FormattedMessage
        //   id="app.updatecandidate"
        //   defaultMessage="Candidate"
        // />}
        width="55%"
        visible={templateViewModal}
        closable
        // maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => handleTemplateViewModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
              <TemplateView
              templateId={props.templateId}
              template={props.template}
              type={props.type}
              currentEmail={props.currentEmail}
            />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddTemplateViewModal;
