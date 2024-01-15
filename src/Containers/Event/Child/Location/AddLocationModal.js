import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer, StyledModal } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import LocationForm from "./LocationForm";


const AddMileageModal = (props) => {
  const { addlocationModal, handleLocationModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.addLocations"
          defaultMessage="Add Locations"
        />}
        width={drawerWidth}
        visible={addlocationModal}
        destroyOnClose
        closable
        placement="right"
        style={{marginTop:"3rem"}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => handleLocationModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <LocationForm />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddMileageModal;
