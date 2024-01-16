import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const UpdateCustomerForm = lazy(() => import("./UpdateCustomerForm"));

const UpdateCustomerModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  const { updateCustomerModal, handleUpdateCustomerModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={props.setEditingCustomer.name}
        width={drawerWidth}
        visible={props.updateCustomerModal}
        maskClosable={false}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"3rem"}}
        onClose={() => props.handleUpdateCustomerModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateCustomerForm customerId={props.customerId} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};


export default UpdateCustomerModal;

