import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer, StyledModal } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import LocationCustomerList from "./LocationCustomerList";


const LocationCustomerDrawer = (props) => {
  const { locationCustomerdrawr, handleLocationCustomerDrawer,storedLoc, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.createVirtualLocation"
          defaultMessage="Create Virtual Location"
        />}
        width={drawerWidth}
        visible={locationCustomerdrawr}
        destroyOnClose
        closable
        placement="right"
        style={{marginTop:"3rem"}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => handleLocationCustomerDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <LocationCustomerList   storedLoc={storedLoc}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default LocationCustomerDrawer;
