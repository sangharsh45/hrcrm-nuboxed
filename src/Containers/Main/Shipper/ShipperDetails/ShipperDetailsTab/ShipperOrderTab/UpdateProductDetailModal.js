import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
const UpdateProductDetailForm = lazy(() => import("./UpdateProductDetailForm"));

const UpdateProductDetailModal = (props) => {
  console.log(props.leadsId);
  const { ...formProps } = props;
  return (
    <>
      <StyledModal
        title="Update Order"
        width="55vw"
        visible={props.updateProductDetailModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleUpdateProductDetailModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateProductDetailForm />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default UpdateProductDetailModal;
