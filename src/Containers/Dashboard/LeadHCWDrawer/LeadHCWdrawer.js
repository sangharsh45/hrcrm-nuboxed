import React, {Suspense,lazy } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import LeadHCWDrawerTab from "./LeadHCWDrawerTab"

const LeadHCWdrawer = (props) => {

  return (
    <>
      <StyledDrawer
        title="Leads HCW"
        width="45%"
        visible={props.openLeadHCWdrawer}
        maskClosable={false}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={()  => props.handleLeadHCWdrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
<LeadHCWDrawerTab/>
        </Suspense>
      </StyledDrawer>
    </>
  );

};

export default LeadHCWdrawer;




  
