import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getExpenseById} from "../ExpenseAction";
import { BundleLoader } from "../../../Components/Placeholder";
const PExpenseDrawerCard=lazy(()=>import("./PExpenseDrawerCard"));

const PExpenseVoucherIdDrawer = (props) => {
  const { pexpenseVoucherIdDrawer, handlePExpenseVoucherIdDrawer,newvoucherId,newparticularRowData, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={`Voucher ID:${newparticularRowData.voucherId}`}
        width="80%"
        visible={pexpenseVoucherIdDrawer}
        onClose={() => {
          handlePExpenseVoucherIdDrawer(false);

        }}
      >
        <Suspense fallback={<BundleLoader />}>
          <PExpenseDrawerCard newvoucherId={newvoucherId} newparticularRowData={newparticularRowData}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

const mapStateToProps = ({ auth, expense }) => ({
  userId: auth.userDetails.userId,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getExpenseById,
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PExpenseVoucherIdDrawer);


