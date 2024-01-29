import React, {useEffect,lazy} from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox } from "../../../../Components/UI/Elements";
import {
//   getJumpInvestorlist,
//   getJumpInvestor2list,
//   getJumpInvestor3list,
//   getJumpInvestor4list,
//   handlePitchQualifiedDrawer,
//   handlePitchAddedDrawer,
//   handleDealAddedDrawer,
//   handleDealClosedDrawer
} from "../../DashboardAction";
// const PitchQualifiedDrawer = lazy(()=>import("./InvestorDrawer/PitchQualifiedDrawer"));
// const PitchAddedDrawer = lazy(()=>import("./InvestorDrawer/PitchAddedDrawer"));
// const DealsAddedDrawer =lazy(()=>import("./InvestorDrawer/DealsAddedDrawer"));
// const DealsClosedDrawer= lazy(()=>import("./InvestorDrawer/DealsClosedDrawer"));

function DashboardOrderJumpstart (props) {
 
//   useEffect(()=>{
//     if (props.timeRangeType === "today") {
//     props.getJumpInvestorlist(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor2list(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor3list(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor4list(props.userId, props.startDate, props.endDate);
//   }
//   else {
//     props.getJumpInvestorlist(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor2list(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor3list(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor4list(props.userId, props.startDate, props.endDate);
//   }
//   },[props.userId,props.startDate,props.endDate]);


    const { openPitchQualified,handlePitchQualifiedDrawer,openPitchAdded,handlePitchAddedDrawer,
      openDealAdded,handleDealAddedDrawer,openDealClosed,handleDealClosedDrawer
    } = props;

    return (
      <>
       <div class=" flex flex-row w-full" >
        <div class=" flex w-full" >
          <JumpStartBox
            noProgress
            title={<FormattedMessage
              id="app.ordersAdded"
              defaultMessage="Orders Added"
            />}
            // jumpstartClick={()=>handlePitchQualifiedDrawer(true)}
            // cursorData={"pointer"}
            // value={props.jumpstartInvestorCount.qualifiedInvestorLeadsList}
            // isLoading={props.user.fetchingJumpstartInvestor}
          />

          <JumpStartBox
            noProgress
            title={<FormattedMessage
                id="app.ordersopen"
                defaultMessage="Orders Open"
            />}
            // jumpstartClick={()=>handlePitchAddedDrawer(true)}
            // cursorData={"pointer"}
            // value={props.jumpstartInvestor2Count.createdinvestorLeadsList}
            // isLoading={props.fetchingJumpstartInvestor2}
          />

          <JumpStartBox
            noProgress
            title={<FormattedMessage
                id="app.ordersclosed"
                defaultMessage="Orders Closed"
            />}
            // jumpstartClick={()=>handleDealAddedDrawer(true)}
            // cursorData={"pointer"}
            // value={props.jumpstartInvestor3Count.opportunityAdded}
            // isLoading={props.fetchingJumpstartInvestor3}
          />
          <JumpStartBox
            noProgress
            title={<FormattedMessage
                id="app.orderscancelled"
                defaultMessage="Orders Cancelled"
            />}
            // jumpstartClick={()=>handleDealClosedDrawer(true)}
            // cursorData={"pointer"}
            // value={ props.jumpstartInvestor4Count.closedOpportunity}
            // isLoading={props.fetchingJumpstartInvestor4}
          />
        </div>
      </div>

      {/* <PitchQualifiedDrawer
      openPitchQualified={openPitchQualified}
      handlePitchQualifiedDrawer={handlePitchQualifiedDrawer}
      />
       <PitchAddedDrawer
      openPitchAdded={openPitchAdded}
      handlePitchAddedDrawer={handlePitchAddedDrawer}
      />
      <DealsAddedDrawer 
     openDealAdded={openDealAdded}
     handleDealAddedDrawer={handleDealAddedDrawer}
    />
    <DealsClosedDrawer 
     openDealClosed={openDealClosed}
     handleDealClosedDrawer={handleDealClosedDrawer}
    /> */}
      </>
     
    );
  }
const mapStateToProps = ({ dashboard, auth }) => ({
  user: auth.userDetails,
  role: auth.userDetails.role,
  showDatelist: dashboard.showDatelist,
  orgId: auth.userDetails.organizationId,
  showSalesDatelist: dashboard.showSalesDatelist,
  fetchingSalesDatewiseReport: dashboard.fetchingSalesDatewiseReport,
  fetchingSalesDatewiseReportError: dashboard.fetchingSalesDatewiseReportError,
  fetchingDatewiseReport: dashboard.fetchingDatewiseReport,
  fetchingDatewiseReportError: dashboard.fetchingDatewiseReportError,
  recruiterId: auth.userDetails.userId,
  userId: auth.userDetails.employeeId,
  timeRangeType:dashboard.timeRangeType,
  startDate: dashboard.startDate,
  endDate: dashboard.endDate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   getJumpInvestorlist,
    //   getJumpInvestor2list,
    //   getJumpInvestor3list,
    //   getJumpInvestor4list,
    //   handlePitchQualifiedDrawer,
    //   handlePitchAddedDrawer,
    //   handleDealAddedDrawer,
    //   handleDealClosedDrawer

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardOrderJumpstart);
