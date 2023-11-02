import React, { lazy, Suspense,useState,useEffect } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer} from "../../../../../Components/UI/Antd";
const DealAddedTable =lazy(()=>import("./DealAddedTable"));

const DealsAddedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
        title="Deals Added"
        width="45%"
        visible={props.openDealAdded}
        maskClosable={false}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={()  => props.handleDealAddedDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
        <DealAddedTable/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};
export default DealsAddedDrawer;




  
