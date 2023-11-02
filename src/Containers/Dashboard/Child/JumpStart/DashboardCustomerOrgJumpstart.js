import React, {useEffect,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment"; 
import { JumpStartBox, Spacer } from "../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../Components/UI/Layout";
import {getDateWiseList,getSalesDateWiseList,getJumpBulblist,getJumpBulblist2,
getJumpCustomerlist,getJumpCustomerlist2,handleLeadQualifiedDrawer,handleLeadAddedDrawer,
handleOppoAddedDrawer,handleOppoClosedDrawer
} from "../../DashboardAction";
const LeadQualifiedDrawer=lazy(()=>import("./CustomerDrawer/LeadQualifiedDrawer"));
const LeadAddedDrawer=lazy(()=>import("./CustomerDrawer/LeadAddedDrawer"));
const OppoAddedDrawer=lazy(()=>import("./CustomerDrawer/OppoAddedDrawer")); 
const OppoClosedDrawer=lazy(()=>import("./CustomerDrawer/OppoClosedDrawer")); 

function DashboardCustomerOrgJumpstart (props){

  useEffect(()=>{
  if (props.timeRangeType === "today") {
  props.getJumpBulblist(props.userId,props.startDate, props.endDate)
  props.getJumpBulblist2(props.userId,props.startDate,props.endDate)
   props.getJumpCustomerlist(props.userId, props.startDate, props.endDate);
   props.getJumpCustomerlist2(props.userId, props.startDate, props.endDate);
  }
  else {
    props.getJumpBulblist(props.userId,props.startDate,props.endDate)
    props.getJumpBulblist2(props.userId,props.startDate,props.endDate)
     props.getJumpCustomerlist(props.userId, props.startDate,props.endDate);
     props.getJumpCustomerlist2(props.userId, props.startDate,props.endDate);
  }
},[props.userId, props.startDate,props.endDate]);
  
  const {handleLeadQualifiedDrawer,openLeadQualified,handleLeadAddedDrawer,
    openLeadAdded,handleOppoAddedDrawer,openOppoAdded,handleOppoClosedDrawer,clickOppoClosed
   } = props;
 

  return(
    <>
      <FlexContainer flexDirection="row" style={{ width: "100%"}}>
        <FlexContainer style={{ width: "100%"}}>
        
          <JumpStartBox
            noProgress
            title="Leads Qualified"
            jumpstartClick={()=>handleLeadQualifiedDrawer(true)}
            cursorData={"pointer"}
            value={props.jumpstartBulbCount.qualifiedLeadsList}
            isLoading={props.user.fetchingJumpstartBulb}
          />
       
          <JumpStartBox
            noProgress
            title="Leads Added"
            jumpstartClick={()=>handleLeadAddedDrawer(true)}
            cursorData={"pointer"}
            value={props.jumpstartBulb2Count.createdLeadsList }
           isLoading={props.fetchingJumpstartBulb2}
    
          />

          <JumpStartBox
            noProgress
            title="Opportunities Added"
            jumpstartClick={()=>handleOppoAddedDrawer(true)}
            cursorData={"pointer"}
            value={props.jumpstrtCUSTOCount.opportunityAdded}
             isLoading={props.fetchingJumpstartCustolist}
            
          />
          <JumpStartBox
            noProgress
            title="Opportunities Closed"
            jumpstartClick={()=>handleOppoClosedDrawer(true)}
            cursorData={"pointer"}
            value={
                props.jumpstrtCUSTO2Count.closedOpportunity
            }
            
            isLoading={props.fetchingJumpstartCusto2list}
          />
        </FlexContainer>
        <Spacer />
    
      </FlexContainer>

      <LeadQualifiedDrawer
      openLeadQualified={openLeadQualified}
      handleLeadQualifiedDrawer={handleLeadQualifiedDrawer}
      />
      <LeadAddedDrawer
      openLeadAdded={openLeadAdded}
      handleLeadAddedDrawer={handleLeadAddedDrawer}
      />
      <OppoAddedDrawer
      openOppoAdded={openOppoAdded}
      handleOppoAddedDrawer={handleOppoAddedDrawer}
      />
      <OppoClosedDrawer
            clickOppoClosed={clickOppoClosed}
            handleOppoClosedDrawer={handleOppoClosedDrawer}
      />

      </>
  ); 
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
  jumpstartBulb2Count:dashboard.jumpstartBulb2Count,
  fetchingJumpstartBulb:dashboard.fetchingJumpstartBulb,
  fetchingJumpstartBulb2:dashboard.fetchingJumpstartBulb2,
  jumpstrtCUSTOCount:dashboard.jumpstrtCUSTOCount,
  fetchingJumpstartCustolist:dashboard.fetchingJumpstartCustolist,
  jumpstrtCUSTO2Count:dashboard.jumpstrtCUSTO2Count,
  fetchingJumpstartCusto2list:dashboard.fetchingJumpstartCusto2list,
  openLeadQualified:dashboard.openLeadQualified,
  openLeadAdded:dashboard.openLeadAdded,
  openOppoAdded:dashboard.openOppoAdded,
  clickOppoClosed:dashboard.clickOppoClosed,
  timeRangeType:dashboard.timeRangeType,
  startDate: dashboard.startDate,
  endDate: dashboard.endDate,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getJumpBulblist,
  getJumpCustomerlist,
  getJumpBulblist2,
  getJumpCustomerlist2,
  handleLeadQualifiedDrawer,
  handleLeadAddedDrawer,
  handleOppoAddedDrawer,
  handleOppoClosedDrawer
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCustomerOrgJumpstart);
