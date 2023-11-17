import React, {Suspense,lazy } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { StyledDrawer } from "../../Components/UI/Antd";
const CompletedTaskTypeDrawerTable=lazy(()=>import("./CompletedTaskTypeDrawerTable"));

const CompletedTaskTypeDrawer = (props) => {

  return (
    <>
      <StyledDrawer
        title= {`${props.particularTaskName.type}`}
        width="45%"
        visible={props.completedtaskDrwr}
        maskClosable={false}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ marginTop:"5rem"}}
        onClose={()  => props.handleCompletedTaskTypeDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
<CompletedTaskTypeDrawerTable particularTaskName={props.particularTaskName}/>
        </Suspense>
      </StyledDrawer>
    </>
  );

};

export default CompletedTaskTypeDrawer;




  
