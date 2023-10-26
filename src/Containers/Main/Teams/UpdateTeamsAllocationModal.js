import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledModal } from "../../../Components/UI/Antd";
const UpdateTeamsAllocationForm = lazy(() => import("./UpdateTeamsAllocationForm"));

const UpdateTeamsAllocationModal = (props) => {
  const { ...formProps } = props;
  return (
    <>
      <StyledModal
        title="Update"
        width="55vw"
        visible={props.updateTeamsAllocationModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleUpdateTeamsAllocationModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateTeamsAllocationForm />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default UpdateTeamsAllocationModal;
