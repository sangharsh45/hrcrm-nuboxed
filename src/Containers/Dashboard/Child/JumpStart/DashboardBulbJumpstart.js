
import React, {useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { JumpStartBox, Spacer } from "../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../Components/UI/Layout";
import {getDateWiseList,getSalesDateWiseList,getJumpBulblist,getavgHour} from "../../DashboardAction";

class DashboardBulbJumpstart extends React.Component{
  constructor() {
    super();
    const startDate = moment().startOf("month"); 
    const endDate = moment();
    var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  this.state = {
    date: date,
    startDate,
    endDate
  };
}

componentDidMount() {
  
   if (this.props.role==="USER"&&this.props.user.department==="Recruiter"){
    const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
    const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`
  const { getDateWiseList, recruiterId,   } = this.props;
  getDateWiseList(recruiterId,  startDate, endDate);
   }else{
    const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
    const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`
    const { getSalesDateWiseList, orgId } = this.props;
    getSalesDateWiseList(orgId,  startDate, endDate);
   }
   
}
componentWillReceiveProps(nextProps) {
  if (
    this.props.startDate !== nextProps.startDate ||
    this.props.endDate !== nextProps.endDate
  ) {
        if(this.props.role==="USER"&&this.props.user.department==="Recruiter"){
    const { getDateWiseList, recruiterId, startDate, endDate } = nextProps;
    getDateWiseList(recruiterId, startDate, endDate);
        }else{
          const { getSalesDateWiseList, orgId, startDate, endDate } = nextProps;
          getSalesDateWiseList(orgId, startDate, endDate);
        }
        
  }
}
componentDidMount() {
  const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
  const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`
  this.props.getJumpBulblist(this.props.userId)
   this.props.getavgHour(this.props.userId, startDate, endDate);
}
  
render() {
  const { showDatelist, fetchingDatewiseReport } = this.props;
   const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
  return(
      <FlexContainer flexDirection="row" style={{ width: "100%"}}>
        <FlexContainer style={{ width: "100%"}}>
        
          <JumpStartBox
            noProgress
            title="Leads Qualified"

            value={
              this.props.user.department === "Recruiter"
              ?this.props.showDatelist.openRequirement
              :this.props.showSalesDatelist.openRequirement
            }
            isLoading={
              this.props.user.department === "Recruiter"
              ?this.props.fetchingDatewiseReport
              :this.props.fetchingSalesDatewiseReport
            }
          />
       
          <JumpStartBox
            noProgress
            title="Open Opportunity"
            value={
  
              this.props.avgHour.hours
            }
            isLoading={this.props.fetchingAvgHour} 
     
    
          />

          <JumpStartBox
            noProgress
            title="Order Generated"

            value={
   
              this.props.jumpstartBulbCount.totalTask
            }
             isLoading={this.props.fetchingTaskper}
            
          />
          <JumpStartBox
            noProgress
            title="Pipeline"
            value={
              this.props.user.department === "Recruiter"
              ?this.props.showDatelist.onboarded
              :this.props.showSalesDatelist.onboarded
            }
            
            isLoading={
              this.props.user.department === "Recruiter"
              ?this.props.fetchingDatewiseReport
              :this.props.fetchingSalesDatewiseReport
            }
          />
        </FlexContainer>
        <Spacer />
    
      </FlexContainer>
    
  ); 
}
}
const mapStateToProps = ({ dashboard,auth }) => ({
  user: auth.userDetails,
  role: auth.userDetails.role,
  showDatelist:dashboard.showDatelist,
  orgId:auth.userDetails.organizationId,
  showSalesDatelist:dashboard.showSalesDatelist,
  fetchingSalesDatewiseReport:dashboard.fetchingSalesDatewiseReport,
  fetchingSalesDatewiseReportError:dashboard.fetchingSalesDatewiseReportError,
  fetchingDatewiseReport:dashboard.fetchingDatewiseReport,
  fetchingDatewiseReportError:dashboard.fetchingDatewiseReportError,
  recruiterId:auth.userDetails.userId,
  fetchingTaskper:dashboard.fetchingTaskper,
  userId: auth.userDetails.employeeId,
  jumpstartBulbCount:dashboard.jumpstartBulbCount,
  avgHour:dashboard.avgHour,
  fetchingAvgHour:dashboard.fetchingAvgHour
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getDateWiseList,
  getSalesDateWiseList,
  getJumpBulblist,
  getavgHour
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardBulbJumpstart);
