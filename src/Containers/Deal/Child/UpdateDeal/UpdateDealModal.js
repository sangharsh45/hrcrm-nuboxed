import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const UpdateDealForm = lazy(() => import("./UpdateDealForm"));

const UpdateDealModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={props.currentItem.opportunityName}
        width={drawerWidth}
        visible={props.openupdateDealModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.handleUpdateDealModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateDealForm currentItem={props.currentItem} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateDealModal;
