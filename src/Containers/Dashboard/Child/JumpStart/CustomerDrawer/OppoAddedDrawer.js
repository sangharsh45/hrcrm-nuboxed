import React, {Suspense,lazy } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
const OppoAddedTable =lazy(()=>import("./OppoAddedTable"));

const OppoAddedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
     title={<FormattedMessage
      id="app.opportunitiesAdded"
      defaultMessage="Opportunities Added"
    />}
        width="45%"
        visible={props.openOppoAdded}
        maskClosable={false}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={()  => props.handleOppoAddedDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
        <OppoAddedTable/>
        </Suspense>
      </StyledDrawer>
    </>
  );

};

export default OppoAddedDrawer;




  
