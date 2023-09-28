import React, { useEffect,useState } from "react";
import { Switch, Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { linkTaskWorkflowToggle } from "../Task/TaskAction";

function TaskConnetToggle(props) {

  const [toggle, setToggle] = React.useState(props.taskCheckListInd);
  console.log("taskCheckListInd",props.taskCheckListInd)

  function handleToggleCollection(item) {
    if (props.taskCheckListInd) {
      props.linkTaskWorkflowToggle({
        taskType: props.taskType,
        taskTypeId: props.taskTypeId,
        taskCheckListInd: props.taskCheckListInd ? false : true,
      },
      props.taskTypeId,
      );

    } else {
      props.linkTaskWorkflowToggle({
        taskType: props.taskType,
        taskTypeId: props.taskTypeId,
        taskCheckListInd: props.taskCheckListInd ? false : true,
      },
      props.taskTypeId,
      );
    }
  }

  function handleCancel() {
    if (props.taskCheckListInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleToggleCollection()}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            // className="toggle-clr"
            checked={props.taskCheckListInd || toggle}
            isLoading={true}
            style={{width: "9em"}}
            checkedChildren="Enabled"
            unCheckedChildren="Disabled"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth, tasks }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  tasks: tasks.tasks,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
         linkTaskWorkflowToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskConnetToggle);










