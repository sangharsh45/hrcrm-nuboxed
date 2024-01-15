import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const PitchConvertStatusForm =lazy(()=>import("./PitchConvertStatusForm"));

const AddConvertPitchStatusModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.Pitch"
          defaultMessage="Pitch"
        />}
        width={drawerWidth}
        style={{marginTop:"3rem"}}
        visible={props.addPitchConvertModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handlePitchConvertModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* helooo */}
          <PitchConvertStatusForm  rowdata={props.rowdata}/>{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

  
  export default AddConvertPitchStatusModal;


