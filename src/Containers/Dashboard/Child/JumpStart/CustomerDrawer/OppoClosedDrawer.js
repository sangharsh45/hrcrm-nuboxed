import React, { lazy, Suspense,useState,useEffect } from "react";
 import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer} from "../../../../../Components/UI/Antd";
const OppoClosedTable =lazy(()=>import("./OppoClosedTable"));

const OppoClosedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
        title="Opportunities Closed"
        width="45%"
        visible={props.clickOppoClosed}
        maskClosable={false}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={()  => props.handleOppoClosedDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
        <OppoClosedTable/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};
export default OppoClosedDrawer;




  
