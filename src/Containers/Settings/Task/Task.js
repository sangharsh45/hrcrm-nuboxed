
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button,Input} from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { MainWrapper } from "../../../Components/UI/Layout";
import { TextInput, } from "../../../Components/UI/Elements";
import SingleTasks from "./SingleTasks";
import moment from "moment";
import {
  getTasks,
  addTasks,
  removeTask,
  updateTasks,
  searchTaskName,
  ClearReducerDataOfTask
} from "./TaskAction";

class Task extends Component {
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
  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getTasks();
      this.props.ClearReducerDataOfTask();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchTaskName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
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

    // if (exist) {
    //   message.error(
    //     "Can't create as another task type exists with same name!"
    //   );
    // } else {
      addTasks(task, () => console.log("add task callback"));
    // }

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
    const { getTasks } = this.props;
    console.log();
    getTasks();
    // this.getLinkedSources();
  }
  render() {
    const {
      fetchingTasks,
      fetchingTasksError,
      tasks,
      addingTasks,
      updatingTasks,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      taskType,
      singleTask,
      linkedTasks,
    } = this.state;
    if (fetchingTasks) return <BundleLoader/>;
    if (fetchingTasksError) return <p>We are unable to load data</p>;
    return (
      <>
        <div class="flex flex-nowrap" >
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
         <div class=" flex w-[18vw]" >
            <Input
         placeholder="Search by Name"
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
            onPressEnter={this.handleSearch}  
            onChange={this.handleChangeDes}
            // value={currentData}
          />
            </div>
            <div class=" flex flex-col" >
              <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
              {tasks.length ? (
                  tasks.map((task, i) => (
                    <SingleTasks
                      key={i}
                      value={singleTask}
                      name="singleTask"
                      task={task}
                      linkedTasks={linkedTasks}
                      updatingTasks={updatingTasks}
                      handleChange={this.handleChange}
                      handleUpdateTask={this.handleUpdateTask}
                         handleDeleteTask={this.handleDeleteTask}
                    />
                  ))
                  ) : (
                    <p>No Data Available</p>
                  )}
              </MainWrapper>
            </div>
            {isTextInputOpen ? (
               <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]"
            
               >
                <br />
                <br />
                <TextInput
                  placeholder="Add Task"
                  name="taskType"
                  value={taskType}
                  onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!taskType}
                  Loading={addingTasks}
                  onClick={this.handleAddTasks}
                  style={{ marginRight: "0.125em" }}
                >
                  {/* Save */}
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
                  {/* Cancel */}
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
              </div>
            ) : (
              <>
                <br />
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    Loading={addingTasks}
                    onClick={this.toggleInput}
                  >
                    {/* Add More */}
                    <FormattedMessage
                      id="app.addmore"
                      defaultMessage="Add More"
                    />
                  </Button>
                </div>
               
              </>
            )}
          </MainWrapper>
          {/* <MainWrapper>
            <FlexContainer
              style={{
                border: "0.0625em solid #eee",
                width: "100%",
                padding: "1.6rem",
                marginRight: 70,
              }}
            >
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Here is a list of sample sources, it will help attribute
                opportunities to their sources thereby identifying the effective
                channels and further allocating resources accordingly.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                Korero allows you to change the sources as per your
                organization's requirements.
              </p>
              <p style={{ color: "#035b9b", fontSize: "1rem" }}>
                The only exception is if an opportunity is associated with a
                source then it cannot be deleted from the list till no
                opportunity exists in that source.
              </p>
            </FlexContainer>
          </MainWrapper> */}
        </div>
        <h4>Updated on {moment(this.props.tasks && this.props.tasks.length && this.props.tasks[0].updationDate).format("ll")} by {this.props.tasks && this.props.tasks.length && this.props.tasks[0].name}</h4>
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
      searchTaskName,
      ClearReducerDataOfTask
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Task);
