import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer, StyledModal } from "../../../Components/UI/Antd";
 const UpdateShipperForm = lazy(() => import("./UpdateShipperForm"));

const UpdateShipperModal = (props) => {
  const { ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title="Shipper"
        width="55vw"
        visible={props.updateShipperModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={() => props.handleUpdateShipperModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateShipperForm 
            rowdata={props.rowdata}
          shipperId={props.shipperId} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateShipperModal;
