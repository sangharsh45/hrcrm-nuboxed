import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { StyledTable } from "../../../Components/UI/Antd";
import { Icon, Tooltip } from "antd";
import { getExpenseById,handleExpenseVoucherIdDrawer } from "../ExpenseAction";
import { BundleLoader } from "../../../Components/Placeholder";
import { OnlyWrapCard } from '../../../Components/UI/Layout'
import styled from 'styled-components';
import dayjs from "dayjs";
import { CurrencySymbol } from "../../../Components/Common";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import ExpenseVoucherIdDrawer from "./ExpenseVoucherIdDrawer";
import ExpensePendingStatusCard from "./ExpensePendingStatusCard";
import ExpenseApprovedStatusCard from "./ExpenseApprovedStatusCard";
import ExpenseRejectedStatusCard from "./ExpenseRejectedStatusCard";

function ExpenseStatusCard(props) {
 
    return (
      <>
       <div className="flex justify-arround">
        <div className="w-[28rem]">
          <ExpensePendingStatusCard/>
        </div>
        <div className="w-[28rem]">
          <ExpenseApprovedStatusCard/>
        </div>
        <div className="w-[28rem]">
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

