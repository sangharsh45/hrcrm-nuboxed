import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Divider, message ,Input, Card} from "antd";
import { MainWrapper, FlexContainer } from "../../Components/UI/Layout";
import { TextInput, Title } from "../../Components/UI/Elements";
import moment from "moment";
import {getInvHotColdWarm} from "./DashboardAction";

function PitchHotColdWarm (props) {
    
  useEffect(()=> {
    if (props.timeRangeType === "today") {
   props.getInvHotColdWarm(props.userId,props.startDate,props.endDate);
    }else{
      props.getInvHotColdWarm(props.userId,props.startDate,props.endDate);
    }
  },[props.userId,props.startDate,props.endDate]);

  const {investorHotColdWarm}=props;


    return (
      <>
   
          <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex">Hot</div>
          <div class="text-2xl">{investorHotColdWarm.hotList}</div>
          </div>
          <div className="col-span-2 sm:col-span-1">
          <div className="flex">Cold</div>
          <div class="text-2xl">{investorHotColdWarm.coldList}</div>
          </div>
          <div className="col-span-2 sm:col-span-1">
          <div className="flex">Warm</div>
          <div class="text-2xl">{investorHotColdWarm.warmList}</div>
        </div>
</div>
        
      </>
    );
  
}

const mapStateToProps = ({ dashboard,auth }) => ({
    investorHotColdWarm:dashboard.investorHotColdWarm,
    userId:auth.userDetails.userId,
    timeRangeType:dashboard.timeRangeType,
    startDate: dashboard.startDate,
    endDate: dashboard.endDate,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvHotColdWarm
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PitchHotColdWarm);

