import React, {Suspense,lazy } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const LeadHCWDrawerTab = lazy(()=>import("./LeadHCWDrawerTab"));

const LeadHCWdrawer = (props) => {

  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.leadsHCW"
          defaultMessage= "Leads HCW"
        />}
       
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




  
