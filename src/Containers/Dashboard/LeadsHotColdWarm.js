import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Divider, message ,Input, Card} from "antd";
import { MainWrapper, FlexContainer } from "../../Components/UI/Layout";
import { TextInput, Title } from "../../Components/UI/Elements";
import moment from "moment";
import {getHotColdWarm} from "./DashboardAction";

function LeadsHotColdWarm (props) {
      
  useEffect(()=> {
    if (props.timeRangeType === "today") {
   props.getHotColdWarm(props.userId,props.startDate,props.endDate);
    }
    else {
      props.getHotColdWarm(props.userId,props.startDate,props.endDate);
    }
  },[props.userId,props.startDate,props.endDate]);

  const {showHotColdWarm}=props;
    return (
      <>
   
          <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex">Hot</div>
          <div class="text-2xl">{showHotColdWarm.hotList}</div></div>
          <div className="col-span-2 sm:col-span-1">
          <div className="flex">Cold</div>
          <div class="text-2xl">{showHotColdWarm.coldList}</div>
          </div>
          <div className="col-span-2 sm:col-span-1">
          <div className="flex">Warm</div>
          <div class="text-2xl">{showHotColdWarm.warmList}</div>
        </div>
</div>
        
      </>
    );
  
}

const mapStateToProps = ({ dashboard,auth }) => ({
    showHotColdWarm:dashboard.showHotColdWarm,
    userId:auth.userDetails.userId,
    timeRangeType:dashboard.timeRangeType,
    startDate: dashboard.startDate,
    endDate: dashboard.endDate,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getHotColdWarm
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
