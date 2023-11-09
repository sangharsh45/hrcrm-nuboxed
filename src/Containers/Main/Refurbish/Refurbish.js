import React, { useEffect } from 'react'
import RefurbishHeader from './RefurbishHeader'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setProductionViewType, getShifts } from "./RefurbishAction";
import OrderPhoneTab from './OrderPhoneTab';
import RefurbishMainTable from './RefurbishMainTable';

const Refurbish = (props) => {
  useEffect(() => {
    props.getShifts(props.userId);
  }, []);
  return (
    <div>
      <RefurbishHeader
        // shiftsData={shiftsData}
        // shiftId={shiftsData.shiftId}
        // handlesetCurrentShift={handlesetCurrentShift}
        setProductionViewType={props.setProductionViewType}
        viewType={props.viewType}
      />
      {props.viewType === "list" ? (
        <OrderPhoneTab />
      ) : props.viewType === "all" ?
        (
          <RefurbishMainTable />
        ) : null}
    </div>
  )
}
const mapStateToProps = ({ refurbish, auth }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  shiftId: refurbish.shiftsData.shiftId,
  shiftsData: refurbish.shiftsData,
  viewType: refurbish.viewType
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

