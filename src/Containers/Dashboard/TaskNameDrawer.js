import React, {Suspense,lazy } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { StyledDrawer } from "../../Components/UI/Antd";
const TaskNameDrawerTable=lazy(()=>import("./TaskNameDrawerTable"));

const TaskNameDrawer = (props) => {

  return (
    <>
      <StyledDrawer
        title= {`${props.particularTaskName.name}`}
        width="70%"
        visible={props.taskNameDrwr}
        onClose={()  => props.handleTaskNameDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
<TaskNameDrawerTable particularTaskName={props.particularTaskName}/>
        </Suspense>
      </StyledDrawer>
    </>
  );

};

export default TaskNameDrawer;




  
