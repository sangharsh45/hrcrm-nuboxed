import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledModal } from "../../../Components/UI/Antd";
// const UpdateShipperForm = lazy(() => import("./UpdateShipperForm"));

const UpdateShipperModal = (props) => {
  const { ...formProps } = props;
  return (
    <>
      <StyledModal
        title="Shipper"
        width="55vw"
        visible={props.updateShipperModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleUpdateShipperModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <UpdateShipperForm shipperId={props.shipperId} /> */}
        </Suspense>
      </StyledModal>
    </>
  );
};

export default UpdateShipperModal;
