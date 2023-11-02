import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import ExpenseStatusForm from "./ExpenseStatusForm";


const ExpenseStatusDrawer = (props) => {
  const { updateStatusExpenseModal, handleStatusExpenseModal,particularRowData,voucherId, ...formProps } = props;
  return (
    <>
      <StyledDrawer
       title={`Status - ${voucherId}`}
        width="30vw"
        visible={updateStatusExpenseModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        // style={{ top: 40 }}
        style={{marginTop:"5rem"}}
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
