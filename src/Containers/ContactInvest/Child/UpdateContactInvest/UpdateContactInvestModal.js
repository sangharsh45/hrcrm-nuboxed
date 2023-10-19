import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const UpdateContactInvestForm = lazy(() => import("./UpdateContactInvestForm"));

const UpdateContactInvestModal = props => {
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "55%";
  const { updateContactInvestModal, handleUpdateContactInvestModal,contactiData, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={contactiData.fullName}
        width={drawerWidth}
        visible={updateContactInvestModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onClose={() => handleUpdateContactInvestModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateContactInvestForm contactiData={contactiData} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateContactInvestModal;
