import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { getMileageByUserId } from "../MileageAction";
const MileageDrawerCard=lazy(()=>import("./MileageDrawerCard"));

const MileageVoucherIdDrawer = (props) => {
  const { mileageVoucherIdDrawer, handleMileageVoucherIdDrwer,voucherId, ...formProps } = props;
  console.log(voucherId)
  return (
    
    <>
      <StyledDrawer
        title={`Mileage: ${voucherId}`}
        width="60%"
        style={{marginTop:"5rem"}}
        visible={mileageVoucherIdDrawer}
        destroyOnClose
        closable
        placement="right"
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => {
          handleMileageVoucherIdDrwer(false);
          props.getMileageByUserId(props.userId)
        }}
      >
        <Suspense fallback={<BundleLoader />}>
          <MileageDrawerCard voucherId={voucherId}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

const mapStateToProps = ({ auth, mileage }) => ({
  userId: auth.userDetails.userId,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMileageByUserId,
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MileageVoucherIdDrawer);


