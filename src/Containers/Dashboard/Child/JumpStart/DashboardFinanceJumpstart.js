import React, {} from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox,JumpStartBox1,JumpStartBox2,JumpStartBox3 } from "../../../../Components/UI/Elements";

function DashboardFinanceJumpstart (props) {

    const { openPitchQualified,handlePitchQualifiedDrawer,openPitchAdded,handlePitchAddedDrawer,
      openDealAdded,handleDealAddedDrawer,openDealClosed,handleDealClosedDrawer
    } = props;

    return (
      <>
       <div class=" flex flex-row w-full" >
        <div class=" flex w-full max-sm:flex-col" >
        <div class="flex w-wk">
          <JumpStartBox
            noProgress
            title={<FormattedMessage
              id="app.financeadded"
              defaultMessage="Finance Added"
            />}
            // jumpstartClick={()=>handlePitchQualifiedDrawer(true)}
            // cursorData={"pointer"}
            // value={props.jumpstartInvestorCount.qualifiedInvestorLeadsList}
            // isLoading={props.user.fetchingJumpstartInvestor}
          />

          <JumpStartBox1
            noProgress
            title={<FormattedMessage
                id="app.financeopen"
                defaultMessage="Finance Open"
            />}
            // jumpstartClick={()=>handlePitchAddedDrawer(true)}
            // cursorData={"pointer"}
            // value={props.jumpstartInvestor2Count.createdinvestorLeadsList}
            // isLoading={props.fetchingJumpstartInvestor2}
          />
</div>
<div class="flex w-wk">
          <JumpStartBox2
            noProgress
            title={<FormattedMessage
                id="app.financeclosed"
                defaultMessage="Finance Closed"
            />}
            // jumpstartClick={()=>handleDealAddedDrawer(true)}
            // cursorData={"pointer"}
            // value={props.jumpstartInvestor3Count.opportunityAdded}
            // isLoading={props.fetchingJumpstartInvestor3}
          />
          <JumpStartBox3
            noProgress
            title={<FormattedMessage
                id="app.financecancelled"
                defaultMessage="Finance Cancelled"
            />}
            // jumpstartClick={()=>handleDealClosedDrawer(true)}
            // cursorData={"pointer"}
            // value={ props.jumpstartInvestor4Count.closedOpportunity}
            // isLoading={props.fetchingJumpstartInvestor4}
          />
          </div>
        </div>
      </div>

 
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
)(DashboardFinanceJumpstart);
