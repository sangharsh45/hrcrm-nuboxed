import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
import CallTaskForm from "./CallTaskForm";
const AddCallTaskModal = (props) => {
  const { addCallTaskModal, handleLeadCallModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "55%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.schedulecall"
          defaultMessage="Schedule Call"
        />}
        width={drawerWidth}
        visible={addCallTaskModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => handleLeadCallModal(false)}
        style={{marginTop:"5rem"}}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CallTaskForm
          rowdata={props.rowdata}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCallTaskModal;
