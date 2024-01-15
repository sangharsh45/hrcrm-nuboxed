import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {  Tooltip } from "antd";
import { RollbackOutlined } from "@ant-design/icons";

const DealDetailActionLeft = (props) => {

  return (
    <div class=" flex items-center" >
      <div class=" w-[21vw]" >
        <Tooltip title="Back">
          <RollbackOutlined
            style={{ marginRight: "0.3rem", color: "#1890ff", fontSize: "1.5625em" }}
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
      {/* {fetchDealdetails ? (
        <div style={{ marginLeft: "18.125em" }}>
          <Spin />
        </div>
      ) : (
     
          <DealStatsCard dealDetailsbyID={dealDetailsbyID} />
        )} */}


    </div>
  );
};
const mapStateToProps = ({ }) => ({

});
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
