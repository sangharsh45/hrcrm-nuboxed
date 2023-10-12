
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  message } from "antd";
import {
  getDashboardTasks,
 
} from "../Dashboard/DashboardAction";



// const SectorsSchema = Yup.object().shape({
//   sectorName: Yup.string().required("Input needed !"),
// });

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
      currentData: ""
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
  // getLinkedDocuments = () => {
  //   axios
  //     .get(`${base_url}/opportunity/source/linkedSources`, {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({ linkedSources: res.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  componentDidMount() {
   
    this.props.getDashboardTasks(this.props.userId);
    // this.getLinkedSources();
  }
  render() {
   console.log("Task1",this.props.tasks)
    return (
      <>
   {/* <div class="flex">
        {this.props.tasks.length&&this.props.tasks.map((item) => {
             return (
        <div class=" flex w-1/2 flex-row">
          
                <div class="flex " >{item.taskType}</div>
              
                </div>
             )
           
        })}
          
          </div> */}
          <div className="grid grid-cols-5 gap-4">
  {this.props.dashboardTasks.length &&
    this.props.dashboardTasks.map((item) => {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      return (
        <div className="col-span-2 sm:col-span-1">
          <div className="flex">{item.name}</div>
          <div class="text-2xl">{item.count}</div>
        </div>
      );
    })}
</div>
        
      </>
    );
  }
}

const mapStateToProps = ({ tasks ,dashboard,auth}) => ({
  addingTasks: tasks.addingTasks,
  addingTasksError: tasks.addingTasksError,
  dashboardTasks: dashboard.dashboardTasks,
  userId:auth.userDetails.userId,

  // removingTasks: tasks.removingTasks,
  // removingTasksError: tasks.removingTasksError,
  
  fetchingDashboardTasks:dashboard.fetchingDashboardTasks,
  fetchingDashboardTasksError: dashboard.fetchingDashboardTasksError,

  updatingTasks: tasks.updatingTasks,
  updatingTasksError: tasks.updatingTasksError,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDashboardTasks,
    
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
