import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader, GridLoader } from "../../Components/Placeholder";
import AddTaskModal from "./Child/AddTaskModal";
import TaskDeletedTable from "../Task/Child/TaskDeletedTable"
import TaskHeader from "./Child/TaskHeader";
import { handleTaskModal ,setTaskViewType} from "./TaskAction";
import TaskApproveTable from "./Child/TaskApproveTable";

const TaskTable = lazy(() => import("./Child/TaskTable"));

class Task extends Component {
  render() {
    const { addTaskModal, handleTaskModal } = this.props;
    return (
      <React.Fragment>
        <TaskHeader 
          viewType={this.props.viewType}
          setTaskViewType={this.props.setTaskViewType}
        handleTaskModal={handleTaskModal} 
        />
        <AddTaskModal
          addTaskModal={addTaskModal}
          handleTaskModal={handleTaskModal}
        />
        <Suspense fallback={<BundleLoader />}>
        {this.props.viewType === "table" ?
          <TaskTable />:
          this.props.viewType === "dashboard" ?
          <TaskDeletedTable/>:
          this.props.viewType === "approve" ?
          <TaskApproveTable/>:
          null}
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ task }) => ({
  addTaskModal: task.addTaskModal,
  viewType: task.viewType,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleTaskModal,
      setTaskViewType
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Task);
