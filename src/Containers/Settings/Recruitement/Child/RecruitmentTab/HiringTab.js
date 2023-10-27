import React, { Component, lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { Formik, Form, Field, FastField } from "formik";
import DeleteIcon from '@mui/icons-material/Delete';
import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
import { bindActionCreators } from "redux";

import {
  handleProcessHiringModal,
  updateProcessNameForOpportunity,
  updateStageForOpportunity,
  addProcessStageForOpportunity,
  getProcessStagesForOpportunity,
  deleteOpportunityProcessData,
  LinkOpportunityProcessPublish,
  LinkOpportunityStagePublish

} from "../../../SettingsAction";
import { Button, Icon, Tag, message, Tooltip, Switch, Popconfirm } from "antd";
import styled from "styled-components";
import {
  MainWrapper,
  Spacer,
  TextInput,
} from "../../../../../Components/UI/Elements";
import {
  addProcessForOpportunity,
 getProcessForOpportunity,
} from "../../../SettingsAction";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { StyledPopconfirm, StyledTabs } from "../../../../../Components/UI/Antd";
import {  Select } from "../../../../../Components/UI/Elements";
import { elipsize } from "../../../../../Helpers/Function/Functions";
import { ActionIcon } from "../../../../../Components/Utils";
// import AddProcessModalForRecruit from "../../AddProcessModalForRecruit";
import { EditOutlined } from "@ant-design/icons";
// import AddApprovalModal from "./AddApprovalModal";
import AddProcessModalForHiring from "./AddProcessModalForHiring";
import SingleOpportunityStages from "./SingleOpportunityStages";
const { Option } = Select;

const TabPane = StyledTabs.TabPane;
class HiringTab extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      fields: {},
      activeKey: "0",
      // viewAll:false,
      // setIsViewAll:false,
      change: true,
      isTextOpen:false,
      isTextInputOpen: false,
      addingStage: false,
      stageName: "",
      probability: null,
      days: null,
      visible: false,
      isViewAll: false,
      currentProcess: [],
      currentStageId: "",
      currentStage: [],
      currentStageName: "",
      exist: false,
      responsible:"",
      isProcessTextInputOpen: false,
      workflowName: "",
      publish: false,
    };
  }

  componentDidMount() {
     this.props.getProcessForOpportunity(this.props.orgId);
  }
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
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
     this.props.getProcessStagesForOpportunity(item.opportunityWorkflowDetailsId);
  };

  handlePublishClick = () => {
    const { currentProcess, publish } = this.state;
    console.log(currentProcess);

    const Id = currentProcess.opportunityWorkflowDetailsId;
    let data = {
      opportunityWorkflowDetailsId: Id,
      publishInd: currentProcess.publishInd ? false : true,
    };

    this.props.LinkOpportunityProcessPublish(data, this.handleCallBack1);
  };

  handleApproveIconClick = (item) => {
    this.setState({
      currentStageId: item,
    });
  };

  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
    toggleInput1 = () =>
    this.setState((prevState) => ({
      isTextOpen: !prevState.isTextOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleCallBack1 = (status, data) => {
    if (status === "Success") {
      this.props.getProcessForOpportunity(this.props.orgId);
      this.setState({ currentProcess: data });
    } else {
      alert("error");
    }
  };
  handleEditProcessName = () => {
    const { updateProcessNameForOpportunity } = this.props;

    const {
      workflowName,

      currentProcess,
    } = this.state;
    const Id = currentProcess.opportunityWorkflowDetailsId;
    let process = { workflowName, opportunityWorkflowDetailsId: Id };
    updateProcessNameForOpportunity(process,Id,this.handleCallBack1 );
    this.setState({
      isProcessTextInputOpen: false,
    });
  };
  handleUpdateStage = (opportunityStagesId, stageName, probability, days) => {
    //debugger;
    const { opportunityProcessStages } = this.props;
    let exist =
    opportunityProcessStages &&
    opportunityProcessStages.some((element) => element.stageName == stageName);
    if (exist) {
      message.error(
        "Stage with same name already exists as part of this workflow"
      );
    } else {
      this.props.updateStageForOpportunity(opportunityStagesId, stageName, probability, days);
    }
  };

  handleStagePublishClick = (opportunityStagesId, publishInd) => {
    const { recruitProcessStages } = this.props;
    const data = {
      opportunityStagesId,
      publishInd: publishInd ? false : true,
    };
    console.log(publishInd);
    this.props.LinkOpportunityStagePublish(data, this.handleCallBack);
  };
  handleCallBack = (status) => {
    if (status === "Success") {
      const {
        currentProcess: { opportunityWorkflowDetailsId },
      } = this.state;

      this.props.getProcessStagesForOpportunity(opportunityWorkflowDetailsId);
    } else {
      alert("error");
    }
  };
  handleCallback = (status) => {
    if (status === "success") {
      return getProcessForOpportunity(this.props.orgId);
    } else {
      return null;
    }
  };
  handleAddWorkflow = () => {
    const { addProcessForOpportunity, workflows } = this.props;
    const {
      workflowName,
      isTextInputOpen,
      orgId,
    //   categoryId,
      editInd,
    } = this.state;
    let header = {
      workflowName,
      orgId: this.props.organizationId,
    };

    let exist =
    workflows &&
    workflows.some(
        (element) => element.workflowName == workflowName
      );

    if (exist) {
      message.error(
        "Can't create as another departmentName exists with same name!"
      );
    } else {
      addProcessForOpportunity(header,  this.props.orgId, () => 
      this.handleCallback
      );
    }

    this.setState({
      categoryName: "",
      subCategoryId:"",
      isTextOpen:false,
      editInd: true,
    });
  };

  handleStageType=(value)=>
  this.setState({responsible:value});
  handleAddStage = () => {
    const { addProcessStage } = this.props;
    const {
      stageName,
      probability,
      addingStage,
      responsible,
      isTextInputOpen,

      currentProcess,
      days,
      currentStage,
    } = this.state;

    const { opportunityProcessStages } = this.props;
    let exist =
    opportunityProcessStages &&
    opportunityProcessStages.some((element) => element.stageName == stageName);

    const Id = currentProcess.opportunityWorkflowDetailsId;
    console.log(Id);
    console.log(currentProcess);
    let stage = {
      stageName,
      probability,
      days,
      responsible,
      // oppworkFlowId: Id,
      orgId: this.props.orgId,
      opportunityWorkflowDetailsId: Id,
    };
    if (exist) {
      debugger;
      message.error("Can not create as another stage exists with same name !");
    } else {
      // message.success("probability add");
      this.props.addProcessStageForOpportunity(
        stage,
        this.handleCallBack,
        this.props.orgId,
        this.props.oppworkFlowId
      );
      // this.props.getProcessStagesForRecruit(this.props.recruitmentProcessId);
    }
    this.setState({
      stageName: "",
      probability: "",
      days: "",
      isTextInputOpen: false,
    });
  };
  render() {
    const { addingProcessForOpportunity, addProcessForOpportunity } = this.props;
    return (
      <>
        <StageWrapper>
          <MainWrapper>
            <h1
            >
              {/* Workflow */}
              <FormattedMessage id="app.workflow" defaultMessage="Workflow" />
            </h1>

            <FlexContainer>
               <StyledTabs
                style={{ width: "80%" }}
                defaultActiveKey={this.state.activeKey}
                onChange={this.handleTabChange}
                type="card"
              >
                {this.props.opportunityProcess.map((item, i) => {
                  return (
                    <TabPane
                      key={i}
                      tab={
                        <span onClick={() => this.handleProcessClick(item)}>
                          {elipsize(item.workflowName, 15)}
                        </span>
                      }
                    ></TabPane>
                  );
                })}
              </StyledTabs> 

              {this.state.isTextOpen ? (
              <FlexContainer
                alignItems="center"
                style={{ marginLeft: "0.3125em", marginTop: "0.3125em" }}
              >
                <br />
                <br />
              
                <TextInput
                  placeholder="Add Workflow"
                  name="workflowName"
                //   value={categoryName}
                  onChange={this.handleChange}
                  width="40%"
                  style={{ marginRight: "0.125em" }}
                />
        
              
         
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  // disabled={!values.taskChecklistName}
                  loading={addingProcessForOpportunity}
                  onClick={this.handleAddWorkflow}
                >
                  
                  Save
                </Button>
                &nbsp;
                <Button type="primary" onClick={this.toggleInput1}>
                  Cancel
               
                </Button>
              </FlexContainer>
            ) : (
              <>
                <br />
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"

                    htmlType="button"
                     Loading={addingProcessForOpportunity}
                    onClick={this.toggleInput1}
                  >
                    Add
                 
                  </Button>
                </FlexContainer>
              </>
            )}
           
            </FlexContainer>
            <Spacer />
            <FlexContainer
              flexDirection="column"
              className="stages"
              justifyContent="center"
              style={{
                width: "100%",
                alignContent: "center",
                alignItems:"center"
              }}
            >
              {this.state.isProcessTextInputOpen ? (
                <div style={{}}>
                  <FlexContainer alignItems="center" justifyContent={"center"}>
                    <TextInput
                      placeholder="Process Name"
                      name="workflowName"
                      defaultValue={
                        this.state.currentProcess.workflowName
                      }
                      onChange={this.handleChange}
                      width={"100%"}
                      style={{ marginLeft: "2.81em" }}
                    />

                    <FlexContainer justifyContent="flex-end">
                      <Button
                        style={{
                          border: "0.06em solid white",
                          color: "black",
                        }}
                        htmlType="submit"
                        onClick={this.handleEditProcessName}
                      >
                        <FormattedMessage id="app.save" defaultMessage="Save" />
                      </Button>
                      <Button
                        style={{
                          border: "0.06em solid white",
                          color: "black",
                        }}
                        onClick={this.handleCancel}
                      >
                        <FormattedMessage
                          id="app.cancel"
                          defaultMessage="Cancel"
                        />
                      </Button>
                    </FlexContainer>
                  </FlexContainer>
                </div>
              ) : 
              (
                <>
                   <h1 style ={{color:"white"}}>
                    {this.state.currentProcess.workflowName ||
                      `${"Select Workflow"}`}{" "}
                  
                   
                    {this.state.currentProcess.workflowName && (
                           <span
                           style={{marginLeft:"1rem"}}
                                     tooltipTitle="Edit"
                        onClick={this.handleEdit}
                        size="0.875em"
                      >
  <EditIcon1></EditIcon1>
              </span>
                    )}
                 
                    
{this.state.currentProcess.workflowName && (
  <span
  style={{ cursor: "pointer" }}>
                      <Popconfirm
                      title="Do you want to delete?"
                      okText="Yes"
                      cancelText="No"
                       onConfirm={() => this.props.deleteOpportunityProcessData(this.state.currentProcess.opportunityWorkflowDetailsId )}
                    >
                      <DeleteIcon
                      type="delete" style={{ color: "white",marginLeft:"1rem" }} />
                    </Popconfirm>

                    </span>
                    )}
                  
                  {this.state.currentProcess.workflowName && (
  <Button
    style={{ color: "white",marginLeft:"1rem" }} // Add this line to change the font color to white
    onClick={this.handlePublishClick}
  >
    {this.state.currentProcess.publishInd ? "Unpublish" : "Publish"}
  </Button>
)}
                
                  </h1> 
                </>
              )}
            </FlexContainer>

           {this.props.opportunityProcessStages.map((opportunityProcessStages, i) => (
              <SingleOpportunityStages
                key={i}
                stageValue1={this.state.stageName}
                newStageName="stageName"
                newProbability="probability"
                newDays="days"
                opportunityWorkflowDetailsId={
                  this.state.currentProcess.opportunityWorkflowDetailsId
                }
                opportunityProcessStages={opportunityProcessStages}
                organization={this.props.organization}
                handleApproveIconClick={this.handleApproveIconClick}
                handleUpdateStage={this.handleUpdateStage}
                handleStageType={this.handleStageType}
                handleStagePublishClick={this.handleStagePublishClick}
                opportunityStagesId={opportunityProcessStages.opportunityStagesId}
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
                <TextInput
                  placeholder="Stage name"
                  name="stageName"
                  value={this.state.stageName}
                  onChange={this.handleChange}
                  width={"20%"}
                />
                &nbsp; &nbsp;
                {/* <StageName style={{ flexBasis: "25%"}}>
                
                <Select style={{ width: "80%"}}
                onChange={this.handleStageType}
                >
                <Option value="internal">Internal</Option>
              <Option value="customer">Customer</Option>
                </Select>
               
                </StageName> */}
                <TextInput
                  type="number"
                  placeholder="Weightage"
                  name="probability"
                  value={this.state.probability}
                  onChange={this.handleChange}
                  width={"12%"}
                />
                &nbsp; &nbsp;
                <TextInput
                  type="days"
                  placeholder="Days"
                  name="days"
                  value={this.state.days}
                  onChange={this.handleChange}
                  width={"8%"}
                />
                &nbsp; &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.handleAddStage}
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
            ) : this.state.currentProcess.workflowName? (
              <>
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    onClick={this.toggleInput}
                    style={{ marginTop: "0.62em" }}
                  >
                    {/* Add Stage */}
                    <FormattedMessage
                      id="app.addstage"
                      defaultMessage="Add Stage"
                    />
                  </Button>
                </FlexContainer>
              </>
            ):null}
          </MainWrapper>
        </StageWrapper>

        <AddProcessModalForHiring/>
      
        {/* <AddApprovalModal
          recruitmentProcessId={this.state.currentProcess.recruitmentProcessId}
          stageId={this.state.currentStageId}
        /> */}
      </>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => ({
  opportunityProcess: settings.opportunityProcess,
  addingProcessForOpportunity: settings.addingProcessForOpportunity,
  addingProcessForOpportunityError: settings.addingProcessForOpportunityError,
  organization:
  auth.userDetails &&
  auth.userDetails.metaData &&
  auth.userDetails.metaData.organization,
  opportunityStagesPublish: settings.opportunityStagesPublish,
  opportunityProcessPublish: settings.opportunityProcessPublish,
  opportunityProcessStages: settings.opportunityProcessStages,
  orgId: auth.userDetails && auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
   handleProcessHiringModal,
   updateProcessNameForOpportunity,
   getProcessForOpportunity,
   addProcessForOpportunity,
   addProcessStageForOpportunity,
   getProcessStagesForOpportunity,
   deleteOpportunityProcessData,
   updateStageForOpportunity,
   LinkOpportunityProcessPublish,
   LinkOpportunityStagePublish
   
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HiringTab);
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
  
  <BorderColorIcon

  className={`pen-to-square ${props.className}`}

  />



);

const EditIcon1 = styled(AppIcon1)`
  color: white;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
