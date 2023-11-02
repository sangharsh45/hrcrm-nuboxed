import React, { useState, Suspense, useEffect, lazy } from "react";
import { StyledTabs } from "../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setProductionViewType, getShifts } from "./RefurbishAction";
import RefurbishHeader from "./RefurbishHeader";
import RefurbishOrderList from "./RefurbishOrderList";
import OrderPhoneTab from "./OrderPhoneTab";


const TabPane = StyledTabs.TabPane;
function Refurbish(props) {
  useEffect(() => {
    props.getShifts(props.userId);
  }, []);
  useEffect(() => {
    if (props.shiftsData.length) {
      setCurrentShift(props.shiftsData[0]);
    }
  }, [props.shiftsData]);

  const [activeKey, setActiveKey] = useState("1");
  const [currentShift, setCurrentShift] = useState({});
  function handlesetCurrentShift(data) {
    setCurrentShift(data);
  }

  const { shiftsData } = props;
  function handleTabChange(key) {
    setActiveKey(key);
    if (activeKey === "1") {
    } else if (activeKey === "2") {
    } else if (activeKey === "3") {
    } else if (activeKey === "4") {
    }
  }
  return (
    <div>
      <RefurbishHeader
        shiftsData={shiftsData}
        shiftId={shiftsData.shiftId}
        handlesetCurrentShift={handlesetCurrentShift}
        setProductionViewType={props.setProductionViewType}
        viewType={props.viewType}
      />
      {props.viewType === "list" ? (
        <OrderPhoneTab />
      ) : props.viewType === "all" ?
        (
          <RefurbishOrderList />
        ) : null}
    </div>
  );
}

const mapStateToProps = ({ production, auth }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  shiftId: production.shiftsData.shiftId,
  shiftsData: production.shiftsData,
  viewType: production.viewType
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setProductionViewType,
      getShifts,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Refurbish);
