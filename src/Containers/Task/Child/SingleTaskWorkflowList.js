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
      startDate:"",
      endDate:"",
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
    const { getTaskTeamList } = this.props;
    console.log();
    // getTaskTeamList();
    // this.getLinkedSources();
  }
  render() {

    const { recruitTaskWorkflowStages } = this.props;
    console.log(recruitTaskWorkflowStages.taskChecklistStagelinkId);

    const {
        recruitTaskWorkflowStages:
       { name,
        included,
        taskChecklistStageName,
         taskChecklistStagelinkId,
         probability,
         days,
         startDate,
         endDate
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
    console.log(currentStage);

    // const disabled = false;
    const disableDelete =
      linkedStages && linkedStages.includes(taskChecklistStagelinkId);
    return (
      <StageWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <FlexContainer
                justifyContent="start"
                alignItems="center"
                // onClick={() => handleStageClick(taskChecklistStagelinkId, taskChecklistStageName)}
                // style={{
                //   backgroundColor:
                //     taskChecklistStagelinkId === currentStage &&
                //     "rgb(161, 185, 185)",
                // }}
              >
                <StageName style={{ flexBasis: "20%", textAlign: "left" }}>
                  {elipsize(taskChecklistStageName, 23)}
                </StageName>
                <StageName style={{ flexBasis: "15%" }}>
                  {probability}%
                </StageName>
                <StageName style={{ flexBasis: "15%" }}>
                  {days}D
                </StageName>
                 <div    style={{ flexBasis: "15%" }}>
                  <DatePicker 
               
                  placeholder="Start Date"
                  onChange={this.onChangeDatePicker} />
                  </div>
                  <div   style={{ flexBasis: "15%" }}>
                  <DatePicker 
                  placeholder="End Date"
                
                  onChange={this.onChangeEndDatePicker} />
                  </div> 
                <div style={{ flexBasis: "15%" }}>
                <>
                <Avatar.Group
                   maxCount={3}
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                {included &&
                  included.map((candidate, i) => {
                     const data1 = candidate.firstName
                     .slice(0,2)
                     .split("")[0]
                     .toUpperCase();
                   console.log("datas", data1);
                    return (
                      <Avatar style={{ backgroundColor: "#f56a00" }}>
                      {data1}
                    
                    </Avatar>
                     

                   
                    );
                  })}
            </Avatar.Group>
            </>
                  </div> 
                
                  <Button type="primary" 
                onClick={() => {
                  this.props.addTaskWorkflow(
                    includeData,
                    // startDate: dayjs(this.state.startDate).toISOString(),
                    // endDate: dayjs(this.state.endDate).toISOString(),
                  
                  );
           
                }}
                  >
  Save
</Button> 
           
              </FlexContainer>
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
const mapStateToProps = ({ settings, auth }) => ({
  taskTeamList:settings.taskTeamList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTaskWorkflow,
      getTaskTeamList
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
