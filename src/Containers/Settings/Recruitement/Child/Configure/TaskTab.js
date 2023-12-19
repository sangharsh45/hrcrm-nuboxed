import React, { Component } from "react";
import { connect } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import styled from "styled-components";
import {
  MainWrapper,
} from "../../../../../Components/UI/Elements";
import {
  getTaskForRecruit,
} from "../../../SettingsAction";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { Select } from "../../../../../Components/UI/Elements";
import { elipsize } from "../../../../../Helpers/Function/Functions";
import TaskWorkFlowTab from "./TaskWorkFlowTab";
const { Option } = Select;

const TabPane = StyledTabs.TabPane;
class TaskTab extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      fields: {},
      activeKey: "0",
      // viewAll:false,
      // setIsViewAll:false,
      change: true,
      subTable:false,
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
      taskTypeId:"",
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
    this.props.getTaskForRecruit();
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
      subTable: !this.state.subTable,
    });
    // this.props.getTaskStagesForRecruit(item.taskChecklistId);
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
       this.props.getTaskForRecruit();
      this.setState({ currentProcess: data });
    } else {
      alert("error");
    }
  };



  render() {
    console.log("process", this.state.currentProcess.taskChecklistName);
    return (
      <>
        <StageWrapper>
          <MainWrapper>
          

            <FlexContainer>
              <StyledTabs
                style={{ width: "80%" }}
                defaultActiveKey={this.state.activeKey}
                onChange={this.handleTabChange}
                type="card"
              >
                {this.props.recruitTask.map((item, i) => {
                  return (
                    <TabPane
                      key={i}
                      tab={
                        <span onClick={() => this.handleProcessClick(item)}>
                          {elipsize(item.taskType, 15)}
                        </span>
                      }
                    ></TabPane>
                  );
                })}
              </StyledTabs>

            </FlexContainer>
            {this.state.subTable && (
             <TaskWorkFlowTab
             taskTypeId={this.state.currentProcess.taskTypeId}
         />
         )}
          </MainWrapper>
        </StageWrapper>

    
      </>
    );
  }
}

const mapStateToProps = ({ settings, auth, document }) => ({
  recruitTask: settings.recruitTask,
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
      getTaskForRecruit,
      // getTaskStagesForRecruit

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TaskTab);
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
