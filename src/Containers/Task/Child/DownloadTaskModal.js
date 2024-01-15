import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import LinkedTaskDocument from "./LinkedTaskDocument";
import TaskWorkFlowList from "./TaskWorkFlowList";


const DownloadTaskModal = (props) => {
  const { ...formProps } = props;

  

  return (
    <>
      <StyledDrawer
         title={props.item.taskName}
    
        width="50%"
        style={{marginTop:"5rem"}}
        visible={props.downloadTaskModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        //style={{ top: 40 }}
        onClose={() => props.handleDownloadTaskModal(false)}
        footer={null}
      >
       <Suspense fallback={<BundleLoader />}>
          <LinkedTaskDocument
        
          item={props.item}
           />{" "}
          
        </Suspense> 
       
      </StyledDrawer>
    </>
  );
};

export default DownloadTaskModal;
