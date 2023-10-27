import { Popover, Select, Button, Switch } from "antd";
import React, { useState, useEffect, Suspense } from "react";
import { StyledSelect, StyledRangePicker } from "../../../Components/UI/Antd";
import { FlexContainer } from "../../../Components/UI/Layout";
import dayjs from "dayjs";
import { connect } from "react-redux";
import {
  setSelectedTimeIntervalReport,
  setTimeRangeReport,

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
    handleButtonClick,
    activeButton,
    user,
  } = props;

  return (
    <>
      <FlexContainer alignItems="center" >
        
        {viewType==="ALL"  && (
        <span 
        onClick={() => handleButtonClick("Tasks")} 
        style={{
          color:activeButton === "Tasks" && "#1890ff",
          cursor:"pointer"
        }}
        >
          Tasks
        </span>
        )}
        &nbsp;
        {viewType==="ALL" && (
        <span 
        onClick={() => handleButtonClick("Customer")} 
        style={{
          color:activeButton === "Customer" && "#1890ff",
          cursor:"pointer"
        }}
        >

          
           Customer
        </span>
        )}
        &nbsp;
        {viewType==="ALL" && (
        <span 
        onClick={() => handleButtonClick("Investors")} 
        style={{
          color:activeButton === "Investors" && "#1890ff",
          cursor:"pointer"
        }}
        >     
           Investors
        </span>
        )}
    &nbsp;
    {viewType==="ALL" && (
        <span 
        onClick={() => handleButtonClick("Accounts")} 
        style={{
          color:activeButton === "Accounts" && "#1890ff",
          cursor:"pointer"
        }}
        >
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


});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSelectedTimeIntervalReport,
      setTimeRangeReport,
    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HeaderActionRight);