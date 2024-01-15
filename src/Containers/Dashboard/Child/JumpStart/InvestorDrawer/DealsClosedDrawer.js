import React, { lazy, Suspense, } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer} from "../../../../../Components/UI/Antd";
const DealClosedTable =lazy(()=>import("./DealClosedTable"));

const DealsClosedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
         title={<FormattedMessage
          id="app.dealsClosed"
          defaultMessage="Deals Closed"
        />}
        width="45%"
        visible={props.openDealClosed}
        maskClosable={false}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={()  => props.handleDealClosedDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
        <DealClosedTable/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};
export default DealsClosedDrawer;




  
