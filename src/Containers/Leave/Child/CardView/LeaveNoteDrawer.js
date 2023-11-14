import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";

const LeaveNote =lazy(()=>import("./LeaveNote"))

const LeaveNoteDrawer = (props) => {
  const { noteLeaveDrawer, handleLeaveNoteDrawer,leavesItems, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={`Note - ${leavesItems.leaveId}`}
        width="35vw"
        visible={noteLeaveDrawer}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onClose={() => handleLeaveNoteDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>hii
          <LeaveNote leavesItems={leavesItems} />{" "} 
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default LeaveNoteDrawer;
