import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Divider, message ,Input, Card} from "antd";
import { MainWrapper, FlexContainer } from "../../Components/UI/Layout";
import { TextInput, Title } from "../../Components/UI/Elements";

import moment from "moment";
// import * as Yup from "yup";
import {
  getTasks,
  addTasks,
  removeTask,
  updateTasks,
  searchTaskName
} from "../Settings/Task/TaskAction";
import SingleTasks from "../Settings/Task/SingleTasks";

class TaskOrganizationNew extends Component {
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
    this.props.getTasks(this.props.userId);
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
   
    this.props.getTasks(this.props.userId);
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
          <div className="grid grid-cols-5 gap-4 p-4">
  {this.props.tasks.length &&
    this.props.tasks.map((item) => {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      return (
        <div className="col-span-2 sm:col-span-1">
          <div className="flex">{item.taskType}</div>
          <div class="text-2xl">{randomNumber}</div>
        </div>
      );
    })}
</div>
        
      </>
    );
  }
}

const mapStateToProps = ({ tasks,auth }) => ({
  addingTasks: tasks.addingTasks,
  addingTasksError: tasks.addingTasksError,
  tasks: tasks.tasks,
  userId:auth.userDetails.userId,
  
  fetchingTasks:tasks.fetchingTasks,
  fetchingTasksError: tasks.fetchingTasksError,

  updatingTasks: tasks.updatingTasks,
  updatingTasksError: tasks.updatingTasksError,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTasks,
      addTasks,
      removeTask,
      updateTasks,
      searchTaskName
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TaskOrganizationNew);


// import React from 'react'

// function TaskNew() {
//   return (
//     <div>TaskNew</div>
//   )
// }

// export default TaskNew
