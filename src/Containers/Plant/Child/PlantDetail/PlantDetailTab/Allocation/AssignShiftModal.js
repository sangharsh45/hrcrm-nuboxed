import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../Components/UI/Antd";
const AssignshiftForm = lazy(() => import("./AssignshiftForm"));
const AssignShiftModal = (props) => {
  //   console.log(props.leadsId);
  const { ...formProps } = props;
  return (
    <>
      <StyledModal
        title="Assign Shift"
        width="55vw"
        visible={props.assignShiftModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleAssignShiftModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <AssignshiftForm />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AssignShiftModal;
