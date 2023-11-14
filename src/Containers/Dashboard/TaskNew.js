
import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  message } from "antd";
import {
  getDashboardTasks,
  handleTaskNameDrawer
} from "../Dashboard/DashboardAction";
const TaskNameDrawer=lazy(()=>import("./TaskNameDrawer"));

class TaskNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedTasks: [],
      isTextInputOpen: false,
      addingTask: false,
      taskType: "",
      type: "",
      singleTask: "",
      editInd:true,
      currentData: "",
      particularTaskName:{}
    };
  }
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getDashboardTasks(this.props.userId);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value })
   
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddTasks = () => {
    const { addTasks, tasks } = this.props;
    const { taskType, addingTasks, isTextInputOpen,editInd
    } = this.state;
    let task = { taskType,editInd
    };

    let exist =
    tasks &&
    tasks.some((element) => element.taskType == taskType);

    if (exist) {
      message.error(
        "Can't create as another task type exists with same name!"
      );
    } else {
      addTasks(task, () => console.log("add task callback"));
    }

    this.setState({
      taskType: "",
      singleTask: "",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  handleDeleteTask = (taskTypeId={taskTypeId}) => {
    this.props.removeTask(taskTypeId);
    this.setState({ taskType: "", singleTask: "" });
  };
  handleUpdateTask = (taskType, taskTypeId,editInd, cb) => {
    this.props.updateTasks(taskType, taskTypeId,editInd, cb);
    this.setState({ taskType: "", singleTask: "",editInd: true });
  };
  componentDidMount() {
    this.props.getDashboardTasks(this.props.userId);
  }
  handleParticularTaskName=(taskNme)=>{
    this.setState({particularTaskName:taskNme})
  }
  render() {
    return (
      <>
          <div className="grid grid-cols-5 gap-4 p-4">
  {this.props.dashboardTasks.length &&
    this.props.dashboardTasks.map((item) => {
      // const randomNumber = Math.floor(Math.random() * 100) + 1;
      return (
        <div className="col-span-2 sm:col-span-1">
          <div className="flex" >{item.name}</div>
          <div class="text-2xl" onClick={()=>{
            this.handleParticularTaskName(item);
            this.props.handleTaskNameDrawer(true)}}>{item.count}</div>
        </div>
      );
    })}
</div>
        <TaskNameDrawer 
        particularTaskName={this.state.particularTaskName}
        taskNameDrwr={this.props.taskNameDrwr}
        handleTaskNameDrawer={this.props.handleTaskNameDrawer}/>
      </>
    );
  }
}

const mapStateToProps = ({ tasks ,dashboard,auth}) => ({
  addingTasks: tasks.addingTasks,
  addingTasksError: tasks.addingTasksError,
  dashboardTasks: dashboard.dashboardTasks,
  userId:auth.userDetails.userId,
  fetchingDashboardTasks:dashboard.fetchingDashboardTasks,
  fetchingDashboardTasksError: dashboard.fetchingDashboardTasksError,
  updatingTasks: tasks.updatingTasks,
  updatingTasksError: tasks.updatingTasksError,
  taskNameDrwr:dashboard.taskNameDrwr,

  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDashboardTasks,
  handleTaskNameDrawer    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TaskNew);


// import React from 'react'

// function TaskNew() {
//   return (
//     <div>TaskNew</div>
//   )
// }

// export default TaskNew
