import React, { lazy, Suspense, } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer} from "../../../../../Components/UI/Antd";
const PitchAddedTable =lazy(()=>import("./PitchAddedTable.js"));

const PitchAddedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
      title={<FormattedMessage
        id="app.pitchAdded"
        defaultMessage="Pitch Added"
      />}
        width="45%"
        visible={props.openPitchAdded}
        maskClosable={false}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={()  => props.handlePitchAddedDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
        <PitchAddedTable/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};
export default PitchAddedDrawer;




  
