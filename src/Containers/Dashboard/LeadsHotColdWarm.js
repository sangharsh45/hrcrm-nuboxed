import React, { useEffect,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Divider, message ,Input, Card} from "antd";
import { MainWrapper, FlexContainer } from "../../Components/UI/Layout";
import { TextInput, Title } from "../../Components/UI/Elements";
import moment from "moment";
import {getHotColdWarm,handleLeadHCWdrawer} from "./DashboardAction";
const LeadHCWdrawer = lazy(()=>import("./LeadHCWDrawer/LeadHCWdrawer"));

function LeadsHotColdWarm (props) {
     
  useEffect(()=> {
    if (props.timeRangeType === "today") {
   props.getHotColdWarm(props.userId,props.startDate,props.endDate);
    }
    else {
      props.getHotColdWarm(props.userId,props.startDate,props.endDate);
    }
  },[props.userId,props.startDate,props.endDate]);

  const {showHotColdWarm,handleLeadHCWdrawer,openLeadHCWdrawer}=props;
    return (
      <>
   
          <div className="grid grid-cols-5 gap-4 p-4">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex">Hot</div>
          <div class="text-2xl cursor-pointer" onClick={()=>{handleLeadHCWdrawer(true)}}>{showHotColdWarm.hotList}</div></div>
          <div className="col-span-2 sm:col-span-1">
          <div className="flex">Cold</div>
          <div class="text-2xl cursor-pointer" onClick={()=>{handleLeadHCWdrawer(true)}}>{showHotColdWarm.coldList}</div>
          </div>
          <div className="col-span-2 sm:col-span-1">
          <div className="flex">Warm</div>
          <div class="text-2xl cursor-pointer" onClick={()=>{handleLeadHCWdrawer(true)}}>{showHotColdWarm.warmList}</div>
        </div>
</div>
        

<LeadHCWdrawer
openLeadHCWdrawer={openLeadHCWdrawer}
handleLeadHCWdrawer={handleLeadHCWdrawer}
/>


      </>

    );
  
}

const mapStateToProps = ({ dashboard,auth }) => ({
    showHotColdWarm:dashboard.showHotColdWarm,
    userId:auth.userDetails.userId,
    timeRangeType:dashboard.timeRangeType,
    startDate: dashboard.startDate,
    endDate: dashboard.endDate,
    openLeadHCWdrawer:dashboard.openLeadHCWdrawer
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getHotColdWarm,
      handleLeadHCWdrawer
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LeadsHotColdWarm);


// import React from 'react'

// function TaskNew() {
//   return (
//     <div>TaskNew</div>
//   )
// }

// export default TaskNew
