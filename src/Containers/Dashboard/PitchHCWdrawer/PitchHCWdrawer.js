import React, {Suspense,lazy } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const PitchHCWDrawerTab = lazy(()=>import("./PitchHCWDrawerTab"));

const PitchHCWdrawer = (props) => {

  return (
    <>
      <StyledDrawer
        title={      <FormattedMessage
          id="app.pitchHCW"
          defaultMessage="Pitch HCW"
        />}
      
        width="45%"
        visible={props.openPitchHCWdrawer}
        maskClosable={false}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={()  => props.handlePitchHCWdrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
<PitchHCWDrawerTab/>
        </Suspense>
      </StyledDrawer>
    </>
  );

};

export default PitchHCWdrawer;




  
