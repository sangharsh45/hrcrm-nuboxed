import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { StyledTable } from "../../../Components/UI/Antd";
import { Icon, Tooltip } from "antd";
import { getExpenseById,handleExpenseVoucherIdDrawer,getRejectdExpense } from "../ExpenseAction";
import { BundleLoader } from "../../../Components/Placeholder";
import { OnlyWrapCard } from '../../../Components/UI/Layout'
import styled from 'styled-components';
import dayjs from "dayjs";
import { CurrencySymbol } from "../../../Components/Common";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import ExpenseVoucherIdDrawer from "./ExpenseVoucherIdDrawer";
import Expense from "../Expense";

function ExpenseRejectedStatusCard(props) {
  const [expand, setExpand] = useState(false);
  const [voucherId, setvoucherId] = useState("");
  const [particularRowData, setParticularRowData] = useState({});
  const [pageNo, setPage] = useState(0);

  function handleSetParticularRowData(item) {
    console.log(item);
    setParticularRowData(item);   
  }

  function handleExpand(voucherId) {
    setExpand(!expand);    
    setvoucherId(voucherId);
  }

  useEffect(() => {
    // props.getExpenseById(props.userId);
    setPage(pageNo + 1);
    props.getRejectdExpense(props.userId,pageNo);
  }, [props.userId]);

 
    const {
      rejectedExpenses,
      expenseVoucherIdDrawer,
      handleExpenseVoucherIdDrawer,
    } = props;

    return (
      <>
         <OnlyWrapCard width="25rem">  
         <div className="p-0.5 inline-flex items-center rounded-md w-max ml-1">
            <span className="pl-2 pr-4 relative">
              <span
                className="absolute left-0 top-0 bottom-0 w-3  rounded-l-md -mt-1 -mb-1 -ml-2 "

              ></span>
              <span class="font-semibold text-base text-cardBody-heading font-poppins"> Rejected </span>
            </span>
          </div>    
              {rejectedExpenses.map((item) => {
                 return (
                  <div>
                  <div className="flex justify-between mt-4"
                      style={{
                          borderBottom: "3px dotted #515050"
                      }}>
                         
                      <div className=" flex font-medium flex-col w-72 ">

                         
                              <Tooltip >
                                  <h4 class=" text-base text-cardBody font-poppins">
                                  Voucher ID
                                  </h4>
                                  <h4 class=" text-base text-blue-500 text-cardBody font-poppins cursor-pointer">
<div onClick={() => { handleExpand(item.voucherId);
                handleSetParticularRowData(item);
                props.handleExpenseVoucherIdDrawer(true);}}>
         {item.voucherId}
         </div>
         </h4>

</Tooltip>

</div>
<div className=" flex font-medium flex-col  w-52 ">
                           
                           <h4 class=" text-base text-cardBody font-poppins"> Voucher Date </h4>
                           <h4 class=" text-base text-cardBody font-poppins">
                               
                           
                           {dayjs(item.voucherDate).format("MMM Do YY")}

                           </h4>
                       </div>
                       <div className=" flex font-medium flex-col w-32 ">
                                  

                                  <h4 class=" text-base text-cardBody font-poppins">Amount</h4>
                                  <h4 class=" text-base text-cardBody font-poppins">
                                      € {item.amount}
                                  </h4>
                              </div>
                              <div className=" flex font-medium flex-col w-[12rem] ">
                                    <h4 class=" text-base text-cardBody font-poppins"></h4>

                                    <div class=" text-base text-cardBody font-poppins">
         
            
              
                                    <div
                style={{
                  border: "2px solid red",
                  padding: "0px 0.62em",
                  textAlign: "center",
                  margin: "2px",
                  borderRadius: "0.62em",
                }}
              >
                <div className="text-[red]">{item.status}</div>
                </div>
                                    </div>
                                    </div>
                        </div>

                        </div>
                    )
                })}
      </OnlyWrapCard>
      

        <ExpenseVoucherIdDrawer
        voucherId={voucherId} 
        particularRowData={particularRowData}
        expenseVoucherIdDrawer={expenseVoucherIdDrawer}
        handleExpenseVoucherIdDrawer={handleExpenseVoucherIdDrawer}
        />
      </>
    );
  }

const mapStateToProps = ({ auth, expense }) => ({
  userId: auth.userDetails.userId,
  Expenses: expense.Expenses,
  fetchingExpenseById: expense.fetchingExpenseById,
  fetchingExpenseByIdError: expense.fetchingExpenseByIdError,
  expenseVoucherIdDrawer:expense.expenseVoucherIdDrawer,
  rejectedExpenses:expense.rejectedExpenses
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getExpenseById,
      handleExpenseVoucherIdDrawer,
      getRejectdExpense
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseRejectedStatusCard);

