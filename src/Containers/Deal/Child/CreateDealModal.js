import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const DealForm = lazy(() => import("./DealForm"));

const CreateDealModal = (props) => {
  const {opencreateDealModal,handleDealModal, ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.deal"
          defaultMessage="Deal"
        />}
        width="60%"
        style={{marginTop:"5rem"}}
        visible={opencreateDealModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => handleDealModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <DealForm />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default CreateDealModal;
