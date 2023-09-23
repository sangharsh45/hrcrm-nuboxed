import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const ExpenseDrawerCard=lazy(()=>import("./ExpenseDrawerCard"));

const ExpenseVoucherIdDrawer = (props) => {
  const { expenseVoucherIdDrawer, handleExpenseVoucherIdDrawer,voucherId,particularRowData, ...formProps } = props;
  console.log(props.particularRowData)
  return (
    <>
      <StyledDrawer
        title={`Voucher ID: ${props.particularRowData.voucherId}`}
        width="60%"
        visible={expenseVoucherIdDrawer}
        destroyOnClose
        closable
        placement="right"
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => handleExpenseVoucherIdDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <ExpenseDrawerCard voucherId={voucherId} particularRowData={particularRowData}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default ExpenseVoucherIdDrawer;
