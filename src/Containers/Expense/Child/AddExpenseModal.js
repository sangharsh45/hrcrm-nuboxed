import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const ExpenseForm=lazy(()=> import("./ExpenseForm"));

const AddExpenseModal = (props) => {
  const { addExpenseModal, handleExpenseModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "55%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.expense"
          defaultMessage="Expense"
        />}
        width={drawerWidth}
        visible={addExpenseModal}
        destroyOnClose
        closable
        placement="right"
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => handleExpenseModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <ExpenseForm />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddExpenseModal;
