import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer, StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const MileageForm=lazy(()=>import("./MileageForm"));

const AddMileageModal = (props) => {
  const { addMileageModal, handleMileageModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.mileage"
          defaultMessage="Mileage"
        />}
        width="70%"
        visible={addMileageModal}
        destroyOnClose
        closable
        placement="right"
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => handleMileageModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <MileageForm />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddMileageModal;
