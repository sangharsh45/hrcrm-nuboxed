import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
const UpdateShipperContactForm = lazy(() =>
  import("./UpdateShipperContactForm")
);

const UpdateShipperContactModal = (props) => {
  const { ...formProps } = props;
  return (
    <>
      <StyledModal
        title="Update"
        width="55vw"
        visible={props.updateShipperContactModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleUpdateShipperContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateShipperContactForm />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default UpdateShipperContactModal;
