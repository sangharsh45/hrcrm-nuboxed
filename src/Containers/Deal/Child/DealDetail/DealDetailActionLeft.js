import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import ActionIcon from "../../../../Components/Utils/ActionIcon";
import { FlexContainer } from "../../../../Components/UI/Layout";
// import { getStageCheckByStageId } from "../../OpportunityAction";
// import OpportunityStatsCard from "./OpportunityCards/OpportunityStatsCard";
import { Spin, Tooltip, Icon } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
// import { RollbackOutlined } from "@ant-design/icons";

const DealDetailActionLeft = (props) => {
  const { opportunity, fetchingOpportunityById } = props;
  const {
    // opportunity: { stageMapper },
  } = props;
  // useEffect(() => {
  //   props.getStageCheckByStageId(
  //     opportunity.stageId,
  //     opportunity.opportunityId
  //   );
  // }, [opportunity.stageId, opportunity.opportunityId]);

  return (
    <FlexContainer alignItems="center">
      <div style={{ width: "21vw" }}>
        <Tooltip title="Back">
          <RollbackOutlined
            style={{ marginRight: "0.3rem", color: "#1890ff", fontSize: "1.5625em" }}
            //iconType="rollback"
            //tooltipTitle="Back"
            tooltiptitle={<FormattedMessage
              id="app.back"
              defaultMessage="Back"
            />}
         
            onClick={() => {
              props.history.goBack();
              
            }}
          />
        </Tooltip>
      </div>
      {/* {fetchingOpportunityById ? (
        <div style={{ marginLeft: "18.125em" }}>
          <Spin />
        </div>
      ) : (
     
          <OpportunityStatsCard opportunity={opportunity} />
        )} */}


    </FlexContainer>
  );
};
const mapStateToProps = ({ opportunity, account, auth }) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getStageCheckByStageId,
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DealDetailActionLeft)
);
