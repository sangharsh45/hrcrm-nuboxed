import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/lib/button";
import { Tooltip } from "antd";
import { handleTaskModal, getTaskListRangeByUserId } from "../TaskAction";
import TaskSharedForm from "./TaskSharedForm";

const TaskActionRight = (props) => {
  function handleTaskRefresh() {
    const {
     
      getTaskListRangeByUserId,
      userDetails: { userId },
    } = props;
    getTaskListRangeByUserId(userId);
  }
  const {
    userId,
    user,
    role,
    handleCustomerModal,
  } = props;
  return (
    <div class=" flex items-center" >
        {user.employee_type === "contractor" && user.candiContShareInd === true || user.employee_type === "employee" && user.candiEmpShareInd === true && user.taskFullListInd === true &&(
         <TaskSharedForm/>
         )} 
       {props.viewType === "approve" ? "":
      <Tooltip placement="left" title="Create">
        <Button
          type="primary"
          ghost
          onClick={() => props.handleTaskModal(true)}
        >
          Add
        </Button>
      </Tooltip>
}
    </div>
  );
};

const mapStateToProps = ({ task, auth }) => ({
  userDetails: auth.userDetails,
  user: auth.userDetails,
  taskListRangeByUserId: task.taskListRangeByUserId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleTaskModal,
      getTaskListRangeByUserId,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TaskActionRight);
