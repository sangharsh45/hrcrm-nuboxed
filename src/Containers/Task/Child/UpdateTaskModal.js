import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import UpdateTaskForm from "./UpdateTaskForm";

const UpdateTaskModal = (props) => {
    const { updateTaskModal, handleUpdateTaskModal, ...formProps } = props;
    return (
      <>
        <StyledDrawer
          // title="Update Task"
          title={<FormattedMessage
            id="app.updatetask"
            defaultMessage="Update Task"
          />}
          width="55vw"
          visible={updateTaskModal}
          maskClosable={false}
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
           style={{marginTop:"5rem"}}
          onClose={() => handleUpdateTaskModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateTaskForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  };
  
  export default UpdateTaskModal;
