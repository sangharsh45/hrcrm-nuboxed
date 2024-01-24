import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import StatusLeavesForm from "./StatusLeavesForm";


const StatusLeavesModal = (props) => {
  const { updateStatusLeaveModal, handleStatusLeaveModal,leaveId, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        //title="Apply for Leaves"
        title={`Status - ${leaveId}`}
        width="60%"
        visible={updateStatusLeaveModal}
        maskClosable={false}
        destroyOnClose
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
