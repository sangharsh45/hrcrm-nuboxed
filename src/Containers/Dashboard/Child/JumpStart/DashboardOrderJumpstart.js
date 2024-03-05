import React, { useEffect, } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox, JumpStartBox1, JumpStartBox2, JumpStartBox3 } from "../../../../Components/UI/Elements";
import {
  getJumpOrderCount,
  getJumpOrderDetail
} from "../../DashboardAction";

function DashboardOrderJumpstart(props) {

  useEffect(() => {
    props.getJumpOrderDetail(props.timeRangeType, "Catalog")
  }, [props.timeRangeType]);
  console.log(props.timeRangeType)
  return (
    <>
      <div class=" flex flex-row w-full" >
        <div class=" flex w-full max-sm:flex-col" >
          <div class="flex w-wk">
            <JumpStartBox
              noProgress
              title={<FormattedMessage
                id="app.ordersAdded"
                defaultMessage="Orders Added"
              />}
              // jumpstartClick={()=>handlePitchQualifiedDrawer(true)}
              cursorData={"pointer"}
              value={props.orderinDashboard.totalOrder}
            // isLoading={props.fetchingJumpOrderCount}
            />

            <JumpStartBox1
              noProgress
              title={<FormattedMessage
                id="app.ordersopen"
                defaultMessage="Orders Open"
              />}
              // jumpstartClick={()=>handlePitchAddedDrawer(true)}
              cursorData={"pointer"}
            // value={ props.orderinDashboard.pendingOrder}
            // isLoading={props.fetchingJumpOrderCount}
            />
          </div>
          <div class="flex w-wk">
            <JumpStartBox2
              noProgress
              title={<FormattedMessage
                id="app.ordersclosed"
                defaultMessage="Orders Closed"
              />}
              // jumpstartClick={()=>handleDealAddedDrawer(true)}
              cursorData={"pointer"}
            // value={props.orderinDashboard.completeOrder}
            // isLoading={props.fetchingJumpOrderCount}
            />
            <JumpStartBox3
              noProgress
              title={<FormattedMessage
                id="app.orderscancelled"
                defaultMessage="Orders Cancelled"
              />}
              // jumpstartClick={()=>handleDealClosedDrawer(true)}
              cursorData={"pointer"}
              value={props.orderinDashboard.cancelOrder}
            // isLoading={props.fetchingJumpOrderCount}
            />
          </div>
        </div>
      </div>
      <div class=" flex flex-row w-full" >
        <div class=" flex w-full max-sm:flex-col" >
          <div class="flex w-wk">
            <JumpStartBox
              noProgress
              title={<FormattedMessage
                id="app.financeadded"
                defaultMessage="Receivable Added"
              />}
            // jumpstartClick={()=>handlePitchQualifiedDrawer(true)}
            // cursorData={"pointer"}
            // value={props.financeDetail.qualifiedInvestorLeadsList}
            // isLoading={props.user.fetchingJumpstartInvestor}
            />

            <JumpStartBox1
              noProgress
              title={<FormattedMessage
                id="app.financeopen"
                defaultMessage="Receivable Open"
              />}
            // jumpstartClick={()=>handlePitchAddedDrawer(true)}
            // cursorData={"pointer"}
            // value={props.financeDetail.createdinvestorLeadsList}
            // isLoading={props.fetchingJumpstartInvestor2}
            />
          </div>
          <div class="flex w-wk">
            <JumpStartBox2
              noProgress
              title={<FormattedMessage
                id="app.financeclosed"
                defaultMessage="Receivable Closed"
              />}
            // jumpstartClick={()=>handleDealAddedDrawer(true)}
            // cursorData={"pointer"}
            // value={props.financeDetail.opportunityAdded}
            // isLoading={props.fetchingJumpstartInvestor3}
            />
            <JumpStartBox3
              noProgress
              title={<FormattedMessage
                id="app.financecancelled"
                defaultMessage="Receivable Cancelled"
              />}
            // jumpstartClick={()=>handleDealClosedDrawer(true)}
            // cursorData={"pointer"}
            // value={ props.financeDetail.closedOpportunity}
            // isLoading={props.fetchingJumpstartInvestor4}
            />
          </div>
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
  orderinDashboard: dashboard.orderinDashboard,
  orgId: auth.userDetails.organizationId,
  fetchingJumpOrderCount: dashboard.fetchingJumpOrderCount,
  userId: auth.userDetails.employeeId,
  timeRangeType: dashboard.timeRangeType,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getJumpOrderCount,
      getJumpOrderDetail
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
