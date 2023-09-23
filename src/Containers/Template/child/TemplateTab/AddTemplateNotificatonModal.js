import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledModal } from "../../../../Components/UI/Antd";
import { StyledTabs } from "../../../../Components/UI/Antd";

const TabPane = StyledTabs.TabPane;
const NotificationForm = lazy(() => import("../TemplateTab/Template/NotificationForm"));

const AddTemplateNotificatonModal = (props) => {
  return (
    <>
      <StyledModal
        //title="Template"
        title={<FormattedMessage
          id="app.notificaton"
          defaultMessage="Notificaton"
        />}
        width="55%"
        visible={props.addTemplateNotificatonModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleTemplateNotificatonModal(false)}
        footer={null}
      >
         
          <>
            <Suspense fallback={<BundleLoader />}>
              <NotificationForm />
            </Suspense>
          </>
  
  
      </StyledModal>
    </>
  );
};

export default AddTemplateNotificatonModal;
