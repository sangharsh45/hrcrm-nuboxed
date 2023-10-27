import React, { lazy, Suspense,useState,useEffect } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer} from "../../../../../Components/UI/Antd";
const PitchAddedTable =lazy(()=>import("./PitchAddedTable.js"));

const PitchAddedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
        title="Pitch Added"
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




  
