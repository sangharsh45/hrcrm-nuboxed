import React, {useEffect,} from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox,JumpStartBox1,JumpStartBox2,JumpStartBox3 } from "../../../../Components/UI/Elements";
import {
  getJumpOrderCount,
} from "../../DashboardAction";

function DashboardOrderJumpstart (props) {
 
  useEffect(()=>{
    if (props.timeRangeType === "today") {
    props.getJumpOrderCount(props.timeRangeType);
    
  }
  else {
    props.getJumpOrderCount(props.timeRangeType);
    
  }
  },[props.timeRangeType]);

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
            cursorData={"pointer"}
            // value={ props.jumstartOrderCount.totalOrder}
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
            // value={ props.jumstartOrderCount.pendingOrder}
            // isLoading={props.fetchingJumpOrderCount}
          />

          <JumpStartBox2
            noProgress
            title={<FormattedMessage
                id="app.ordersclosed"
                defaultMessage="Orders Closed"
            />}
            // jumpstartClick={()=>handleDealAddedDrawer(true)}
            cursorData={"pointer"}
            // value={ props.jumstartOrderCount.completeOrder}
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
            // value={ props.jumstartOrderCount.cancelOrder}
            // isLoading={props.fetchingJumpOrderCount}
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
  showDatelist: dashboard.showDatelist,
  orgId: auth.userDetails.organizationId,
  fetchingJumpOrderCount: dashboard.fetchingJumpOrderCount,
  userId: auth.userDetails.employeeId,
  timeRangeType:dashboard.timeRangeType,
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getJumpOrderCount,
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
