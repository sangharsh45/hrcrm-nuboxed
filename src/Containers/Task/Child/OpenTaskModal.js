import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";


const OpenTaskModal = (props) => {
  const { ...formProps } = props;

  

  return (
    <>
      <StyledDrawer
         title={props.item.taskName}
    
        width="64%"
        style={{marginTop:"5rem"}}
        visible={props.addTaskDetailModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        //style={{ top: 40 }}
        onClose={() => props.handleTaskopenModal(false)}
        footer={null}
      >
        
        <Suspense fallback={<BundleLoader />}>
          {/* <OpportunityRequirementBoard
           candidateRequirement={props.candidateRequirement}
          item={props.item}
           />{" "} */}
          
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default OpenTaskModal;
