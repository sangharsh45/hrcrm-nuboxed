import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Divider, message ,Input, Card} from "antd";
import { MainWrapper, FlexContainer } from "../../Components/UI/Layout";
import { TextInput, Title } from "../../Components/UI/Elements";
import moment from "moment";
import {getHotColdWarm} from "./DashboardAction";

function PitchHotColdWarm (props) {
    const startDate = moment().startOf("month"); 
    const endDate = moment();
    var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
  
      const [dateD,setdateD]=useState(date);
      const [startDatestart,setstartDate]=useState(startDate);
      const [endDateend,setendDate]=useState(endDate);
      
  useEffect(()=> {
    const startDate = `${startDatestart.format("YYYY-MM-DD")}T20:00:00Z`
    const endDate = `${endDateend.format("YYYY-MM-DD")}T20:00:00Z`
//    props.getHotColdWarm(props.userId,startDate,endDate);
  },[]);

  const {showHotColdWarm}=props;


    return (
      <>
   
          <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex">Hot</div>
          {/* <div class="text-2xl">{showHotColdWarm.hotList}</div> */}
          </div>
          <div className="col-span-2 sm:col-span-1">
          <div className="flex">Cold</div>
          {/* <div class="text-2xl">{showHotColdWarm.coldList}</div> */}
          </div>
          <div className="col-span-2 sm:col-span-1">
          <div className="flex">Warm</div>
          {/* <div class="text-2xl">{showHotColdWarm.warmList}</div> */}
        </div>
</div>
        
      </>
    );
  
}

const mapStateToProps = ({ dashboard,auth }) => ({
    showHotColdWarm:dashboard.showHotColdWarm,
    userId:auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   getHotColdWarm
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PitchHotColdWarm);


// import React from 'react'

// function TaskNew() {
//   return (
//     <div>TaskNew</div>
//   )
// }

// export default TaskNew
