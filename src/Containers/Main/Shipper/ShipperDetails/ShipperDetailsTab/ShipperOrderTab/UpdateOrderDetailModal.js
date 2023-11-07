import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
const UpdateOrderDetailForm = lazy(() => import("./UpdateOrderDetailForm"));

const UpdateOrderDetailModal = (props) => {
  const { ...formProps } = props;
  return (
    <>
      <StyledModal
        title="Update Order"
        width="55vw"
        visible={props.updateOrderDetailModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleUpdateOrderDetailModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateOrderDetailForm orderId={props.particularRowData} />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default UpdateOrderDetailModal;
