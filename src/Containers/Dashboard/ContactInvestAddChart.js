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
import OpportunityCardView from "../Opportunity/OpportunityCardView";
import { MainWrapper } from "../../Components/UI/Elements";

 class ContactInvestAddChart extends React.Component {
  constructor() {
    super();
    var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
  
  this.state = {
    date: date,
  };
  }
//   componentDidMount() {
//     const { getDashCustomerAddedContacts, userId, startDate, endDate } = this.props;
//     getDashCustomerAddedContacts(userId,  startDate, endDate);
//   }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.startDate !== nextProps.startDate ||
      this.props.endDate !== nextProps.endDate
    ) {
      const { getDashCustomerAddedContacts, userId, startDate, endDate } = nextProps;
      getDashCustomerAddedContacts(userId, startDate, endDate);
    }
  }

 

  // useEffect(() => {
  //   props.getDashBoardClosureRatio(props.organisationId,"Recruiter");
    
  // }, []);
  render() {
    const data=this.props.dashCustoContactsAdded
  return (
    <>
    <MainWrapper
    style={{height:"16em",width:"-webkit-fill-available"}}
    >
      {/* Recruitment Performance */}
      <FlexContainer justifyContent="space-between">
      {/* <div style={{ width: "47%" }}> */}
      <span>Hours</span>
      {/* </div> */}
      {/* <div style={{ width: "47%" }}> */}
    <TimeInterval
          times={this.props.dateClosureRangeList}
           handleClick={this.props.setSelectedClosureTimeIntervalReport}
        />
        {/* </div> */}
        </FlexContainer>
    <BarChart
      width={350}
      height={200}
    //   data={data}
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
      {/* <Bar dataKey="Selected" stackId="a" fill="#ff715885" />
      <Bar dataKey="Onboarded" stackId="a" fill="orange" />  */}
    </BarChart>
    </MainWrapper>
    </>
  );
}
 }
const mapStateToProps = ({ dashboard,auth,opportunity }) => ({
  dashCustoContactsAdded:dashboard.dashCustoContactsAdded,
  userId: auth.userDetails.userId,
  endDate: opportunity.endDate,
  startDate: opportunity.startDate,
  dashBoardClosureRatio:dashboard.dashBoardClosureRatio,
  organisationId:auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  dateClosureRangeList:opportunity.dateClosureRangeList
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   getDashCustomerAddedContacts,
        setSelectedClosureTimeIntervalReport
      

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestAddChart);



