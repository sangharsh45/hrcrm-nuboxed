import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../Components/UI/Antd";
import { StyledTabs } from "../../../../../Components/UI/Antd";

const TabPane = StyledTabs.TabPane;
const TemplateForm = lazy(() => import("./TemplateForm"));
const NotificationForm = lazy(() => import("./NotificationForm"));

const AddTemplateModal = (props) => {
  return (
    <>
      <StyledModal
        //title="Template"
        title={<FormattedMessage
          id="app.Template"
          defaultMessage="Template"
        />}
        width="55%"
        visible={props.addTemplateModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleTemplateModal(false)}
        footer={null}
      >
         
          <>
            <Suspense fallback={<BundleLoader />}>
              <TemplateForm />
            </Suspense>
          </>
  
  
      </StyledModal>
    </>
  );
};

export default AddTemplateModal;
