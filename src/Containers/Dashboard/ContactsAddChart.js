import React, { Component,useState, useMemo ,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../Components/UI/Layout";
import TimeInterval from "../../Utils/TimeInterval";
import {setSelectedClosureTimeIntervalReport} from "../Opportunity/OpportunityAction";
import {getDashCustomerAddedContacts} from "../Dashboard/DashboardAction";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { MainWrapper } from "../../Components/UI/Elements";

 function ContactsAddChart (props) {

  useEffect(() => {
    if (props.timeRangeType === "today"){
    props.getDashCustomerAddedContacts(props.userId,props.startDate,props.endDate); 
    }
    else {
      props.getDashCustomerAddedContacts(props.userId,props.startDate,props.endDate); 
    }
  }, [props.userId,props.startDate,props.endDate]);

    const data=props.dashCustoContactsAdded

  return (
    <>
    <MainWrapper
    style={{height:"16em",width:"-webkit-fill-available"}}
    >
    
      <FlexContainer justifyContent="space-between">

      <span>Hours</span>


    <TimeInterval
          times={props.dateClosureRangeList}
           handleClick={props.setSelectedClosureTimeIntervalReport}
        />
        </FlexContainer>
    <BarChart
      width={350}
      height={200}
      data={data}
      margin={{
        top: 10,
        right: 20,
        left: 6,
        bottom: 10
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Number" />
      <YAxis />
      <Tooltip />
      <Legend className="recharts-default-legend"/>
      <Bar dataKey="Number" stackId="a" fill="rgb(0, 192, 239, 0.4)" />
      
    </BarChart>
    </MainWrapper>
    </>
  );
}

const mapStateToProps = ({ dashboard,auth,opportunity }) => ({
  dashCustoContactsAdded:dashboard.dashCustoContactsAdded,
  userId: auth.userDetails.userId,
  endDate: opportunity.endDate,
  startDate: opportunity.startDate,
  dashBoardClosureRatio:dashboard.dashBoardClosureRatio,
  organisationId:auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  dateClosureRangeList:opportunity.dateClosureRangeList,
  timeRangeType:dashboard.timeRangeType,
  startDate: dashboard.startDate,
  endDate: dashboard.endDate,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDashCustomerAddedContacts,
      setSelectedClosureTimeIntervalReport
      

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactsAddChart);



