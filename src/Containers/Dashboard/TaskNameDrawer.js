import React, {Suspense,lazy } from "react";
import { BundleLoader } from "../../Components/Placeholder";
import { StyledDrawer } from "../../Components/UI/Antd";
const TaskNameDrawerTable=lazy(()=>import("./TaskNameDrawerTable"));

const TaskNameDrawer = (props) => {

  return (
    <>
      <StyledDrawer
        title= {`${props.particularTaskName.name}`}
        width="60%"
        visible={props.taskNameDrwr}
        maskClosable={false}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ marginTop:"3rem"}}
        onClose={()  => props.handleTaskNameDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
<TaskNameDrawerTable particularTaskName={props.particularTaskName}/>
        </Suspense>
      </StyledDrawer>
    </>
  );

};

export default TaskNameDrawer;




  
