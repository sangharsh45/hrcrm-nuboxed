import React, { Component } from "react";
import {
  Icon,
  Popconfirm,
  Tooltip,
  Dropdown,
  Menu,
  Progress,
  Switch,
  message,
} from "antd";
import RecruitmentStages from "../OpportunityTab/Recruitment/RecruitmentStages";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import {
  getOpportunityStageData,
  addOpportunityStageDisable,
} from "../../../OpportunityAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
class OpportunityStageRow extends Component {
  // componentDidMount() {
  //   //debugger;
  //   this.props.getOpportunityStageData(this.props.opportunity.opportunityId);
  // }

  constructor(props) {
    super(props);
    this.state = {
      stageList: [],
    };
  }
  handleIconClick = (stageList) => {
    this.setState({ stageList });
  };
  render() {
    const {
      getOpportunityStageData,
      opportunitiesStage,
      opportunity,
    } = this.props;
    // var findProbability = 0;
    // item.stageList.forEach((element) => {
    //   if (element.stageId === item.stageId) {
    //     findProbability = element.probability;
    //   }
    // });

    return (
      <>
        {opportunitiesStage.stageDetails &&
          opportunitiesStage.stageDetails.map((item) => {
            return (
              // opportunitiesStage
              <>
                <FlexContainer>
                  <div>
                    {" "}
                    <Progress
                      type="circle"
                      style={{ cursor: "pointer" }}
                      // percent={item.probability}
                      width={40}
                      strokeColor={"#005075"}
                    />
                  </div>
                  <div>{item.stageName}</div>
                  <div>
                    <Switch
                      checked={item.toggle}
                      stageId={item.stageId}
                      disableInd={item.disableInd}
                      // onChange={() => this.addOpportunityStageDisable()}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                </FlexContainer>
              </>
            );
          })}
      </>
    );
  }
}
const mapStateToProps = ({ opportunity }) => ({
  // opportunitiesStage: opportunity.opportunitiesStage,
  // stageId: opportunity.stageId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getOpportunityStageData,
      // addOpportunityStageDisable,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityStageRow);
