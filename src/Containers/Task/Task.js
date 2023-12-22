import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader, GridLoader } from "../../Components/Placeholder";
import { handleTaskModal ,setTaskViewType} from "./TaskAction";
const AddTaskModal = lazy(() => import("./Child/AddTaskModal"));
const TaskDeletedTable = lazy(() => import("../Task/Child/TaskDeletedTable"));
const TaskHeader = lazy(() => import("./Child/TaskHeader"));
const TaskApproveTable = lazy(() => import("./Child/TaskApproveTable"));
const GanttChart = lazy(() => import("./Child/GanttChart"));
const TaskTable = lazy(() => import("./Child/TaskTable"));
const TaskCardList = lazy(() => import("./Child/TaskCardList"));
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
          // <TaskTable />
          <TaskCardList/>
          :
          this.props.viewType === "gantt" ?
          <GanttChart/>:
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
