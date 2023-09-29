import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import StatusLeavesForm from "./StatusLeavesForm";


const StatusLeavesModal = (props) => {
  const { updateStatusLeaveModal, handleStatusLeaveModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        //title="Apply for Leaves"
        title={<FormattedMessage
          id="app.applyforleaves"
          defaultMessage="Status Leaves"
        />}
        width="30vw"
        visible={updateStatusLeaveModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        // style={{ top: 40 }}
        style={{marginTop:"5rem"}}
        onClose={() => handleStatusLeaveModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <StatusLeavesForm leaveId={props.leaveId} />{" "} 
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default StatusLeavesModal;
