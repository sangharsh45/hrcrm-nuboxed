import React, { lazy, Suspense,useState,useEffect } from "react";
 import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer} from "../../../../../Components/UI/Antd";
const PitchQualifiedTable =lazy(()=>import("./PitchQualifiedTable"));

const PitchQualifiedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
        title="Pitch Qualified"
        width="45%"
        visible={props.openPitchQualified}
        maskClosable={false}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={()  => props.handlePitchQualifiedDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
        <PitchQualifiedTable/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};
export default PitchQualifiedDrawer;




  
