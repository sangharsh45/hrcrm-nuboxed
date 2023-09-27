
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Divider, message ,Input} from "antd";
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
    this.props.getTasks();
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
   
    this.props.getTasks();
    // this.getLinkedSources();
  }
  render() {
   console.log("Task1",this.props.tasks)
    return (
      <>
    
        {this.props.tasks.length&&this.props.tasks.map((item) => {
             return (
        <div class=" flex w-1/2">
                <div >{item.taskType}</div>
                
                </div>
             )
           
        })}
          
        
        
      </>
    );
  }
}

const mapStateToProps = ({ tasks }) => ({
  addingTasks: tasks.addingTasks,
  addingTasksError: tasks.addingTasksError,
  tasks: tasks.tasks,

  // removingTasks: tasks.removingTasks,
  // removingTasksError: tasks.removingTasksError,
  
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
export default connect(mapStateToProps, mapDispatchToProps)(TaskNew);


// import React from 'react'

// function TaskNew() {
//   return (
//     <div>TaskNew</div>
//   )
// }

// export default TaskNew
