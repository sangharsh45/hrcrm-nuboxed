import { Popover, Select, Button, Switch } from "antd";
import React, { useState, useEffect, Suspense } from "react";
import { StyledSelect, StyledRangePicker } from "../../../Components/UI/Antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import dayjs from "dayjs";
import { connect } from "react-redux";
import {
  setSelectedTimeIntervalReport,
  setTimeRangeReport,
  setSelectedReportType,
  setSubSelectedReportType,

} from "../DashboardAction";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import TimeInterval from "../../../Utils/TimeInterval";

const HeaderActionRight = (props) => {
  const {

    setSelectedTimeIntervalReport,
    dateRangeList,
    viewType,
    setDashboardViewType,
    user,
  } = props;

  console.log("vww",viewType)
  return (
    <>
      <FlexContainer alignItems="center" >
        
        {viewType==="ALL"  && (
        <span 
        onClick={() =>  setDashboardViewType("taskOrg")} 
        style={{
          color:viewType === "taskOrg" && "#1890ff",
        }}
        >
          Tasks
        </span>
        )}
        &nbsp;
        {viewType==="ALL" && (
        <span onClick={() => setDashboardViewType("custOrg")}>
          
           Customer
        </span>
        )}
        &nbsp;
        {viewType==="ALL" && (
        <span onClick={() => setDashboardViewType("invOrg")}>
          
           Investors
     
        </span>
        )}
    &nbsp;
    {viewType==="ALL" && (
        <span onClick={() => setDashboardViewType("accOrg")}>
          Accounts
        </span>
        )}
    &nbsp;
    {viewType==="ALL" && (
      <>
      <div class="">
    <TimeInterval
    style={{fontSize:"0.67"}}
          times={dateRangeList}
          handleClick={setSelectedTimeIntervalReport}
        />
        </div>
        <Popover>
          <StyledRangePicker
            style={{width:"20%"}}
            onChange={(range) => {
              props.setTimeRangeReport(range[0], range[1]);
              console.log(range);
            }}

          />
        </Popover>
        </>
    )}
      </FlexContainer>
    </>
  );
};


const mapStateToProps = ({ auth, dashboard }) => ({
  user: auth.user,
  userId: auth.userDetails.userId,
  dateRangeList: dashboard.dateRangeList,
  // viewType:dashboard.viewType,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSelectedTimeIntervalReport,
      setTimeRangeReport,
      setSelectedReportType,
      setSubSelectedReportType,
    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HeaderActionRight);