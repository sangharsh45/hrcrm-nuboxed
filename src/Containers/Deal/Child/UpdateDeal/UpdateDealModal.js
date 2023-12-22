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
        style={{marginTop:"3rem"}}
        visible={props.openupdateDealModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
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
