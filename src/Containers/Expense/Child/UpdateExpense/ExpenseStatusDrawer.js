import React, {  Suspense,lazy } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const ExpenseStatusForm=lazy(()=>import("./ExpenseStatusForm"));


const ExpenseStatusDrawer = (props) => {
  const { updateStatusExpenseModal, handleStatusExpenseModal,particularRowData,voucherId, ...formProps } = props;
  return (
    <>
      <StyledDrawer
       title={`Status - ${voucherId}`}
        width="30vw"
        visible={updateStatusExpenseModal}
        onClose={() => handleStatusExpenseModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ExpenseStatusForm voucherId={voucherId} particularRowData={particularRowData} />{" "} 
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default ExpenseStatusDrawer;
