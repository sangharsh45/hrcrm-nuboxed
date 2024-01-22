import React, {lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const ExpensePendingStatusCard =lazy(()=>import("./ExpensePendingStatusCard"));
const ExpenseApprovedStatusCard =lazy(()=>import("./ExpenseApprovedStatusCard"));
const ExpenseRejectedStatusCard =lazy(()=>import("./ExpenseRejectedStatusCard"));


function ExpenseStatusCard(props) {
 
    return (
      <>
       <div className="flex justify-arround max-sm:flex-col max-sm:overflow-x-auto h-[34rem]">
        <div className="w-[26rem] max-sm:w-wk">
          <ExpensePendingStatusCard/>
        </div>
        <div className="w-[26rem] max-sm:w-wk">
          <ExpenseApprovedStatusCard/>
        </div>
        <div className="w-[26rem] max-sm:w-wk">
          <ExpenseRejectedStatusCard/>
        </div>
       </div>

       
      </>
    );
  }

const mapStateToProps = ({ auth, expense }) => ({
  userId: auth.userDetails.userId,
  Expenses: expense.Expenses,
  fetchingExpenseById: expense.fetchingExpenseById,
  fetchingExpenseByIdError: expense.fetchingExpenseByIdError,
  expenseVoucherIdDrawer:expense.expenseVoucherIdDrawer
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getExpenseById,
      // handleExpenseVoucherIdDrawer
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseStatusCard);

