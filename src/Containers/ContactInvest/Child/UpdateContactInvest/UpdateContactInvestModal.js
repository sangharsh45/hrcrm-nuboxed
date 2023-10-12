import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const UpdateContactInvestForm = lazy(() => import("./UpdateContactInvestForm"));

const UpdateContactInvestModal = props => {
  const { updateContactInvestModal, handleUpdateContactInvestModal,contactiData, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={contactiData.fullName}
        width="55%"
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
