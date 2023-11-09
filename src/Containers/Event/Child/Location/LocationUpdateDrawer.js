import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer, StyledModal } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const LocationUpdateForm=lazy(()=>import("./LocationUpdateForm"));


const LocationUpdateDrawer = (props) => {
  const { locationUpdatedrawr, handleUpdateLocationDrawer,storedLoc, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "55%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.updateLocation"
          defaultMessage="Update Location"
        />}
        width={drawerWidth}
        visible={locationUpdatedrawr}
        destroyOnClose
        closable
        placement="right"
        style={{marginTop:"5rem"}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => handleUpdateLocationDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <LocationUpdateForm   storedLoc={storedLoc}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default LocationUpdateDrawer;
