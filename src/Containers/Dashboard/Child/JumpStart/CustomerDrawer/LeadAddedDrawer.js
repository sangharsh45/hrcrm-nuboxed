import React, {Suspense,lazy } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
const LeadAddedTable =lazy(()=>import("./LeadAddedTable"));

const LeadAddedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
        title="Leads Added"
        width="45%"
        visible={props.openLeadAdded}
        maskClosable={false}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={()  => props.handleLeadAddedDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
        <LeadAddedTable/>
        </Suspense>
      </StyledDrawer>
    </>
  );

};

export default LeadAddedDrawer;




  
