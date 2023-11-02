import React, { lazy, Suspense,useState,useEffect } from "react";
 import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer} from "../../../../../Components/UI/Antd";
const LeadQualifiedTable =lazy(()=>import("./LeadQualifiedTable"));

const LeadQualifiedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
        title="Leads Qualified"
        width="45%"
        visible={props.openLeadQualified}
        maskClosable={false}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={()  => props.handleLeadQualifiedDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
        <LeadQualifiedTable/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};
export default LeadQualifiedDrawer;




  
