import React, {Suspense,lazy } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { StyledDrawer } from "../../Components/UI/Antd";
const CompletedTaskTypeDrawerTable=lazy(()=>import("./CompletedTaskTypeDrawerTable"));

const CompletedTaskTypeDrawer = (props) => {

  return (
    <>
      <StyledDrawer
        title= {`${props.particularTaskName.name}`}
        width="60%"
        visible={props.completedtaskDrwr}
        onClose={()  => props.handleCompletedTaskTypeDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
<CompletedTaskTypeDrawerTable particularTaskName={props.particularTaskName}/>
        </Suspense>
      </StyledDrawer>
    </>
  );

};

export default CompletedTaskTypeDrawer;




  
