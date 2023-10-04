import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, Tooltip, Popconfirm, DatePicker, Avatar, } from "antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import {
  TextInput,
  Select,
} from "../../../Components/UI/Elements";
import { getEmployeelist } from "../../Employees/EmployeeAction";
import {addTaskWorkflow,getTaskTeamList} from "../../Settings/SettingsAction"
import { elipsize } from "../../../Helpers/Function/Functions";
import { ViewEditCard } from "../../../Components/UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import moment from "moment";
import dayjs from "dayjs";
const { Option } = Select;

class SingleTaskWorkflowList extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      color: "red",
      // currentStage: [],
      fields: {},
      responsible: "",
    //   startDate: Array(props.recruitTaskWorkflowStage.length).fill(moment(props.creationDate)),
    // endDate: Array(props.recruitTaskWorkflowStage.length).fill(moment()),
      endDate:"",
      startDate:"",
      candidate:[],
      selectedOptions:[],
      publish: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    debugger;
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });
  };
  handleChangeValue =(selectedValue)=>{
    this.setState({selectedOptions:selectedValue})
  }
  handleSave = () => {

    const { addTaskWorkflow } = this.props;
     addTaskWorkflow();
  };
  onChangeDatePicker = (startDate, dateString) => {
    console.log(startDate, dateString);
    this.setState({ startDate: dayjs(dateString) });
  };
  onChangeEndDatePicker = (endDate, dateString) => {
    console.log(endDate, dateString);
    this.setState({ endDate: dayjs(dateString) });
  };

  handleStageType = (value) => this.setState({ responsible: value });
  componentDidMount() {
    const { getTaskTeamList,item } = this.props;
    console.log();
    //  getTaskTeamList(item.taskId);
    this.props.getEmployeelist();
  }
  render() {
    // const startDate= 
    // const endDate= dayjs(this.state.endDate).toISOString()
console.log("candidate",this.state.candidate)
console.log("startDate",this.state.startDate)
    const { recruitTaskWorkflowStage } = this.props;
    console.log("selectedOptions",this.state.selectedOptions);
    console.log(recruitTaskWorkflowStage.taskChecklistStageName);

    const {
      recruitTaskWorkflowStage:
       { name,
        included,
        taskChecklistStageName,
         taskChecklistStagelinkId,
         probability,
         days,
        //  startDate,
        //  endDate
        },
      linkedStages,
      organization,
      newStageName,
      newProbability,
      newDays,

      stageValue1,
      handleChange,
      updatingStages,
      handleUpdateStage,
      color,
      key,
      currentStage,
    } = this.props;
    

    const includeData=included && included.map((item)=>{
      return item.fullName;
    })
    console.log("includeData",includeData);
    console.log(taskChecklistStagelinkId, "----------", linkedStages);
    console.log(color);
   

    // const disabled = false;
    const disableDelete =
      linkedStages && linkedStages.includes(taskChecklistStagelinkId);
    return (
      <StageWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between items-center"
              
          
              >
                <div class="flex">
                <StageName style={{ flexBasis: "20%", textAlign: "left" }}>
                  {elipsize(taskChecklistStageName, 23)}
                </StageName>
                <StageName style={{ flexBasis: "9%" }}>
                  {probability}%
                </StageName>
                <StageName style={{ flexBasis: "9%" }}>
                  {days}D
                </StageName>
              
            

  {/* Start Date */}
  <div class="flex w-32 mr-3" >
    <DatePicker
      //  defaultValue={this.state.startDate}
      placeholder="Start Date"
      onChange={this.onChangeDatePicker}
    />
  </div>

  {/* End Date */}
  <div class="flex w-32 mr-3" >
    <DatePicker
    // defaultValue={this.state.endDate}
      placeholder="End Date"
      onChange={this.onChangeEndDatePicker}
    />
  </div>

  {/* Stage */}
  <div class="flex w-96" >
    <Select
      style={{ border: "2px solid black", }}
      mode="multiple"
      value={this.state.selectedOptions}
      options={this.props.employees.map((option) => ({
        value: option.employeeId,
        label: option.fullName,
      }))}
      onChange={this.handleChangeValue}
    />
  </div>
  <StageName style={{ flexBasis: "15%" }}>
                  <Avatar.Group
  maxCount={2}
  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
>
  {included &&
    included.map((candidate, i) => {
      if (candidate && candidate.fullName) {
        const data1 = candidate.fullName.slice(0, 2);
        console.log("datas", data1);
        return (
          <Tooltip title={candidate.fullName} key={i}>
            <Avatar style={{ backgroundColor: "#94b3e4" }}>
              {data1}
            </Avatar>
          </Tooltip>
        );
      } else {
        return null; 
      }
    })}
</Avatar.Group>
                </StageName>

  {/* Save Button */}
  <Button
    type="primary"
    onClick={() => {
      this.props.addTaskWorkflow(
        this.state.selectedOptions,
        dayjs(this.state.startDate).toISOString(),
        dayjs(this.state.endDate).toISOString(),
        this.props.item.taskId,
        taskChecklistStagelinkId,
      );
    }}
  >
    Save
  </Button>
</div>


           
              </div>
            ) : (
              <FlexContainer justifyContent="center">
                <TextInput
                  name={newStageName}
                  // value={stageValue1 || taskChecklistStageName}
                  // defaultValue={taskChecklistStageName}
                  onChange={this.handleChange}
                  // disabled={disabled}
                  width={"25%"}
                />

                <Button
                  type="primary"
                  htmlType="submit"
                  // disabled={disabled}
                  loading={updatingStages}
                  onClick={() =>
                    handleUpdateStage(
                      // this.props.taskChecklistStagelinkId,
                      this.props.taskChecklistStagelinkId,
                      this.state.fields.taskChecklistStageName,
                      toggleViewType()
                    )
                  }
                >
                  {/* Save */}
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>

                <Button type="primary" ghost onClick={() => toggleViewType()}>
                  {/* Cancel */}
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
              </FlexContainer>
            )
          }
        </ViewEditCard>
      </StageWrapper>
    );
  }
}
const mapStateToProps = ({ settings,employee, auth }) => ({
  employees: employee.employees,
  recruitTaskWorkflowStages: settings.recruitTaskWorkflowStages,
  // taskTeamList:settings.taskTeamList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTaskWorkflow,
      getEmployeelist
      // getTaskTeamList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SingleTaskWorkflowList);
// export default SingleRecruitStages;

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
const StageValue = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-size: 1 rem;
  font-weight: 400;
  margin: 0;
`;
