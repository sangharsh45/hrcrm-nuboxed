import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer, StyledModal } from "../../../../Components/UI/Antd";


const LocationSupplierDrawer = (props) => {
  const { locationSupplierdrawr, handleLocationSupplierDrawer,storedLoc, ...formProps } = props;
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
        visible={locationSupplierdrawr}
        destroyOnClose
        closable
        placement="right"
        style={{marginTop:"3rem"}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => handleLocationSupplierDrawer(false)}
      >
        {/* <Suspense fallback={<BundleLoader />}>
          <LocationSupplerList   storedLoc={storedLoc}/>
        </Suspense> */}
      </StyledDrawer>
    </>
  );
};

export default LocationSupplierDrawer;
