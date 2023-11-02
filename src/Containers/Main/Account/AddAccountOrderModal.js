import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer, StyledModal } from "../../../Components/UI/Antd";
import AccountOrderTable from "./AccountOrderTable";


const AddAccountOrderModal = (props) => {

  return (
    <>
      <StyledDrawer
        title="Order"
        width="60vw"
        visible={props.addDistributorOrderModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={() => props.handleDistributorOrderModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <AccountOrderTable distributorId={props.distributorId} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddAccountOrderModal;
