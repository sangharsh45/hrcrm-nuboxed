import React, { Component } from "react";
import { connect } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, message, Popconfirm } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";
import {
  MainWrapper,
  Spacer,
  TextInput,
} from "../../../../../Components/UI/Elements";
import {
  handleTaskDrawer,
  getTaskForWorkflow,
   updateTaskStageForRecruit,
  addTaskStageForRecruit,
    getTaskStagesForRecruit,
  deleteTaskData,
  updateTaskNameForRecruit
} from "../../../SettingsAction";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { Select } from "../../../../../Components/UI/Elements";
import { elipsize } from "../../../../../Helpers/Function/Functions";
// import AddRecruitmentDrawerModal from "../RecruitmentTab/AddRecruitmentDrawerModal";
import AddTaskModal from "./AddTaskModal";
import SingleTaskStages from "./SingleTaskStages";
const { Option } = Select;

const TabPane = StyledTabs.TabPane;
class TaskWorkflowTab extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      fields: {},
      activeKey: "0",
      // viewAll:false,
      // setIsViewAll:false,
      change: true,
      isTextInputOpen: false,
      addingStage: false,
      taskChecklistStageName: "",
      probability: null,
      days: null,
      rowData: "",
      startDate:"",
      endDate:"",
      // probability: null,
      setCurrentRowData: "",
      visible: false,
      isViewAll: false,
      currentProcess: [],
      currentStageId: "",
      currentStage: [],
      currentStageName: "",
      exist: false,
      responsible: null,
      isProcessTextInputOpen: false,
      taskChecklistName: "",
      publish: false,
    };
  }

  componentDidMount() {
    this.props.getTaskForWorkflow(this.props.taskTypeId);
  }
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  onChangeDatePicker = (startDate, dateString) => {
    console.log(startDate, dateString);
    this.setState({ startDate: dayjs(dateString) });
  };
  onChangeEndDatePicker = (endDate, dateString) => {
    console.log(endDate, dateString);
    this.setState({ endDate: dayjs(dateString) });
  };

  handleEdit = () => {
    this.setState((prevState) => ({
      isProcessTextInputOpen: !prevState.isProcessTextInputOpen,
    }));
  };
  handleCancel = () => {
    this.setState({
      isProcessTextInputOpen: false,
    });
  };
  handleProcessClick = (item, i) => {
    this.setState({
      currentProcess: item,
    });
     this.props.getTaskStagesForRecruit(item.taskChecklistId);
  };

  //   handleModalClick = () => {
  //     const { currentProcess, publish } = this.state;
  //     console.log(currentProcess);

  //     const Id = currentProcess.recruitmentProcessId;
  // let data = {
  //   recruitmentProcessId: Id,
  //   publishInd: currentProcess.publishInd ? false : true,
  // };

  //     this.props.getAllDocumentsType(Id, );
  //   };

  handleApproveIconClick = (item) => {
    this.setState({
      currentStageId: item,
    });
  };
  handleRowClick = (item) => {
    this.setState({
      rowData: item,
    });
  };

  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleCallBack1 = (status, data) => {
    if (status === "Success") {
       this.props.getTaskForWorkflow(this.props.taskTypeId);
      this.setState({ currentProcess: data });
    } else {
      alert("error");
    }
  };
    handleEditProcessName = () => {
      const { updateTaskNameForRecruit } = this.props;

      const {
        taskChecklistName,

        currentProcess,
      } = this.state;
      const Id = currentProcess.taskChecklistId;
      let process = { taskChecklistName, taskChecklistId: Id };
      updateTaskNameForRecruit(process, this.handleCallBack1);
      this.setState({
        isProcessTextInputOpen: false,
      });
    };
    handleUpdateStage = (taskChecklistStagelinkId, taskChecklistStageName,probability,days ) => {
      //debugger;
      const { recruitTaskStages } = this.props;
      let exist =
      recruitTaskStages &&
      recruitTaskStages.some((element) => element.taskChecklistStageName == taskChecklistStageName);
      if (exist) {
        message.error(
          "Stage with same name already exists as part of this workflow"
        );
      } else {
        this.props.updateTaskStageForRecruit(taskChecklistStagelinkId, taskChecklistStageName,probability,days);
      }
    };

  //   handleStagePublishClick = (taskChecklistStagelinkId, publishInd) => {
  //     const { recruitTaskStages } = this.props;
  //     const data = {
  //       taskChecklistStagelinkId,
  //       publishInd: publishInd ? false : true,
  //     };
  //     console.log(publishInd);
  //     this.props.LinkStagePublish(data, this.handleCallBack);
  //   };
  handleCallBack = (status) => {
    if (status === "Success") {
      const {
        currentProcess: { taskChecklistId },
      } = this.state;

       this.props.getTaskStagesForRecruit(taskChecklistId);
    } else {
      alert("error");
    }
  };

  handleStageType = (value) => this.setState({ responsible: value });

  handleAddStage = () => {
    const { addTaskStage } = this.props;
    const {
      taskChecklistStageName,
      // probability,
      probability,
      startDate,
      endDate,
      addingStage,
      isTextInputOpen,
      responsible,
      currentProcess,
      days,
      currentStage,
    } = this.state;

    const { recruitTaskStages } = this.props;
    let exist =
      recruitTaskStages &&
      recruitTaskStages.some(
        (element) => element.taskChecklistStageName == taskChecklistStageName
      );

    const Id = currentProcess.taskChecklistId;
    console.log(Id);
    console.log(currentProcess);
    console.log(this.props.handleRecruitmentDrawerModal);
    let stage = {
      taskChecklistStageName,
      // probability,
      days,
      // startDate: dayjs(this.state.startDate).toISOString(),
      // endDate: dayjs(this.state.endDate).toISOString(),
      probability,
      responsible,
      taskChecklistId: Id,
      organizationId: this.props.organizationId,
      processId: this.props.processId,
    };
    if (exist) {
      debugger;
      message.error("Can not create as another stage exists with same name !");
    } else {
      // message.success("probability add");
      this.props.addTaskStageForRecruit(
        stage,
        this.handleCallBack,
        this.props.organizationId,
        this.props.processId
      );
    }
    this.setState({
      taskChecklistStageName: "",
      // probability: "",
      days: "",
      probability:"",
      startDate:"",
      endDate:"",
      responsible: "",
      isTextInputOpen: false,
    });
  };
  render() {
    console.log("process", this.state.currentProcess.taskChecklistName);
    return (
      <>
        <StageWrapper>
          <MainWrapper>
            <h1>
              {/* Workflow */}
              <FormattedMessage id="app.workFlow" defaultMessage="WorkFlow" />
            </h1>

            <FlexContainer>
              <StyledTabs
                style={{ width: "80%" }}
                defaultActiveKey={this.state.activeKey}
                onChange={this.handleTabChange}
                type="card"
              >
                {this.props.recruitWorkflowTask.map((item, i) => {
                  return (
                    <TabPane
                      key={i}
                      tab={
                        <span onClick={() => this.handleProcessClick(item)}>
                          {elipsize(item.taskChecklistName, 15)}
                        </span>
                      }
                    ></TabPane>
                  );
                })}
              </StyledTabs>

              <Button
                style={{ margin: 10 }}
                ghost
                onClick={() => this.props.handleTaskDrawer(true)}
                type="primary"
              >
                Add
              </Button>

              <Spacer />
              <FlexContainer
                flexDirection="column"
                className="stages"
                justifyContent="center"
                style={{
                  width: "100%",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {this.state.isProcessTextInputOpen ? (
                  <div>
                    <FlexContainer
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <TextInput
                        placeholder="Task Name"
                        name="taskChecklistName"
                        defaultValue={
                          this.state.currentProcess.taskChecklistName
                        }
                        onChange={this.handleChange}
                        width={"100%"}
                      />

                      <FlexContainer justifyContent="flex-end">
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={this.handleEditProcessName}
                        >
                          <FormattedMessage
                            id="app.save"
                            defaultMessage="Save"
                          />
                        </Button>
                        <Button type="primary" onClick={this.handleCancel}>
                          <FormattedMessage
                            id="app.cancel"
                            defaultMessage="Cancel"
                          />
                        </Button>
                      </FlexContainer>
                    </FlexContainer>
                  </div>
                ) : (
                  <>
                    <FlexContainer>
                      <h1 style={{ color: "white" }}>
                        {this.state.currentProcess.taskChecklistName ||
                          `${"Select Workflow"}`}{" "}
                        {this.state.currentProcess.taskChecklistName && (
                          <span
                            tooltipTitle="Edit"
                            onClick={this.handleEdit}
                            size="0.875em"
                          >
                            <BorderColorIcon style={{ fontSize: "1rem" }} />
                          </span>
                        )}
                        {this.state.currentProcess.taskChecklistName && (
                          <span style={{ cursor: "pointer" }}>
                            <Popconfirm
                              title="Do you want to delete?"
                              okText="Yes"
                              cancelText="No"
                               onConfirm={() => this.props.deleteTaskData(this.state.currentProcess.taskChecklistId )}
                            >
                              <DeleteIcon
                                type="delete"
                                style={{ color: "white" }}
                              />
                            </Popconfirm>
                          </span>
                        )}
                      </h1>
                    </FlexContainer>
                  </>
                )}
              </FlexContainer>
            </FlexContainer>

            {this.props.recruitTaskStages.map((recruitTaskStages, i) => (
              <SingleTaskStages
                key={i}
                stageValue1={this.state.taskChecklistStageName}
                newStageName="taskChecklistStageName"
                newDays="days"
                newProbability="probability"
               newStartDate="startDate"
               newEndDate="endDate"
                //newResponsible="responsible"
                handleUpdateStage={this.handleUpdateStage}
                handleStageType={this.handleStageType}
                // taskChecklistId={this.state.currentProcess.taskChecklistId}
                recruitTaskStages={recruitTaskStages}
                organization={this.props.organization}
                taskChecklistStagelinkId={recruitTaskStages.taskChecklistStagelinkId}
                // taskChecklistStagelinkId={recruitTaskStages.taskChecklistStagelinkId}
                className="scrollbar"
                id="style-3"
              />
            ))}

            <Spacer />
            {this.state.isTextInputOpen ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FlexContainer justifyContent="space-between">
                  <TextInput
                    placeholder="Stage name"
                    name="taskChecklistStageName"
                    value={this.state.taskChecklistStageName}
                    onChange={this.handleChange}
                    width={"20%"}
                  />
                <TextInput
                  type="number"
                  placeholder="Stage Progress in %"
                  name="probability"
                  value={this.state.probability}
                  onChange={this.handleChange}
                  width={"20%"}
                />
                     <TextInput
                  type="number"
                  placeholder="Days"
                  name="days"
                  value={this.state.days}
                  onChange={this.handleChange}
                  width={"20%"}
                />
               {/* <div>
                  <DatePicker 
                  placeholder="Start Date"
                  onChange={this.onChangeDatePicker} />
                  </div>
                  <div>
                  <DatePicker 
                  placeholder="End Date"
                  onChange={this.onChangeEndDatePicker} />
                  </div> */}
              
                </FlexContainer>
                <div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.handleAddStage}
                  >
                    {/* Save */}
                    <FormattedMessage id="app.save" defaultMessage="Save" />
                  </Button>

                  <Button type="primary" ghost onClick={this.toggleInput}>
                    {/* Cancel */}
                    <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                  </Button>
                </div>
              </div>
            ) : this.state.currentProcess.taskChecklistName ? (
              <>
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    onClick={this.toggleInput}
                  >
                    {/* Add Stage */}
                    <FormattedMessage
                      id="app.addstage"
                      defaultMessage="Add Stage"
                    />
                  </Button>
                </FlexContainer>
              </>
            ) : null}
          </MainWrapper>
        </StageWrapper>

        <AddTaskModal taskTypeId={this.props.taskTypeId} />
      </>
    );
  }
}

const mapStateToProps = ({ settings, auth, document }) => ({
    recruitWorkflowTask: settings.recruitWorkflowTask,
  recruitTaskStages: settings.recruitTaskStages,
  organization:
    auth.userDetails &&
    auth.userDetails.metaData &&
    auth.userDetails.metaData.organization,
  organizationId: auth.userDetails && auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleTaskDrawer,
      getTaskForWorkflow,
       updateTaskStageForRecruit,
      addTaskStageForRecruit,
       getTaskStagesForRecruit,
      deleteTaskData,
       updateTaskNameForRecruit
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TaskWorkflowTab);
const StageWrapper = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
const StageName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 400;
  // margin-bottom: 0;
  margin: 0;
`;

const AppIcon1 = (props) => (
  <BorderColorIcon className={`pen-to-square ${props.className}`} />
);

const EditIcon1 = styled(AppIcon1)`
  color: white;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
