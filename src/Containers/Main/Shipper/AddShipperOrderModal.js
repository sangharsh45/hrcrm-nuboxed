import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../Components/Placeholder";
import { StyledModal } from "../../../Components/UI/Antd";
// const ShipperDispatchTable = lazy(() =>
//   import("./ShipperOrderTab/ShipperDispatchTable")
// );

const AddShipperOrderModal = (props) => {
  // console.log(props.ShipperId);
  return (
    <>
      <StyledModal
        title="Order"
        width="65%"
        height="100%"
        visible={props.addShipperOrderModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleShipperOrderModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <ShipperDispatchTable shipperId={props.shipperId} /> */}
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddShipperOrderModal;
