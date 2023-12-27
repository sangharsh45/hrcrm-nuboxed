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
import { FormattedMessage } from "react-intl";

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
        
        
        <span 
        onClick={() => handleButtonClick("Tasks")} 
        style={{
          color:activeButton === "Tasks" && "#1890ff",
          cursor:"pointer"
        }}
        >
            <FormattedMessage
                        id="app.tasks"
                        defaultMessage="Tasks"
                      />
          {/* Tasks */}
        </span>
  
        &nbsp;
    {user.crmInd === true && (
        <span 
        onClick={() =>  handleButtonClick("Customer")} 
        style={{
          color:activeButton ==="Customer" ? activeButton === "Customer" && "#1890ff" && viewType === "ALL" && "#444" : viewType === "ALL" && "#1890ff" ,
          cursor:"pointer"
        }}
        >
           <FormattedMessage
                        id="app.prospect"
                        defaultMessage="Prospect"
                      />
           
        </span>
)}
        &nbsp;
    {user.imInd ==true  && (
        <span 
        onClick={() => handleButtonClick("Investors")} 
        style={{
          color:activeButton === "Investors" && "#1890ff",
          cursor:"pointer"
        }}
        >  
          <FormattedMessage
                        id="app.investors"
                        defaultMessage="Investors"
                      />   
           
        </span>
)}
    &nbsp;
    {user.erpInd === true && (
        <span 
        onClick={() => handleButtonClick("Accounts")} 
        style={{
          color:activeButton === "Accounts" && "#1890ff",
          cursor:"pointer"
        }}
        >
           <FormattedMessage
                        id="app.customer"
                        defaultMessage="Customer"
                      /> 
          
        </span>
    )}
    &nbsp;
   
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

      </FlexContainer>
    </>
  );
};


const mapStateToProps = ({ auth, dashboard }) => ({
  user: auth.userDetails,
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