import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { StyledTable } from "../../../Components/UI/Antd";
import { Icon, Tooltip } from "antd";
import { getExpenseById,handlePExpenseVoucherIdDrawer,getRejectdExpense } from "../ExpenseAction";
import { BundleLoader } from "../../../Components/Placeholder";
import { OnlyWrapCard } from '../../../Components/UI/Layout'
import styled from 'styled-components';
import dayjs from "dayjs";
import { CurrencySymbol } from "../../../Components/Common";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import PExpenseVoucherIdDrawer from "./PExpenseVoucherIdDrawer";
import Expense from "../Expense";

function ExpenseRejectedStatusCard(props) {
  const [expand, setExpand] = useState(false);
  const [newvoucherId, setnewvoucherId] = useState("");
  const [newparticularRowData, setnewParticularRowData] = useState({});
  const [pageNo, setPage] = useState(0);

  function handleSetNewParticularRowData(item) {
    console.log(item);
    setnewParticularRowData(item);   
  }
  function handleExpand(newvoucherId) {
    setExpand(!expand);    
    setnewvoucherId(newvoucherId);
  }

  useEffect(() => {
    // props.getExpenseById(props.userId);
    setPage(pageNo + 1);
    props.getRejectdExpense(props.userId,pageNo);
  }, [props.userId]);

 
    const {
      rejectedExpenses,
      pexpenseVoucherIdDrawer,
      handleExpenseVoucherIdDrawer,
    } = props;

    return (
      <>
         <OnlyWrapCard width="25rem" className="h-[32rem]">  
         <div className="p-0.5 inline-flex items-center rounded-md w-max ml-1">
            <span className="pl-2 pr-4 relative">
              <span
                className="absolute left-0 top-0 bottom-0 w-3  rounded-l-md -mt-1 -mb-1 -ml-2 "

              ></span>
              <span class="font-semibold text-sm text-cardBody-heading font-poppins"> Rejected </span>
            </span>
          </div>    
              {rejectedExpenses.map((item) => {
                 return (
                  <div>
                  <div className="flex justify-between mt-4"
                      style={{
                          borderBottom: "3px dotted #515050"
                      }}>
                         
                      <div className=" flex font-medium flex-col w-72 mb-1 ">

                         
                              <Tooltip >
                                  <h4 class=" text-sm text-cardBody font-poppins">
                                  Voucher ID
                                  </h4>
                                  <h4 class=" text-xs text-blue-500 text-cardBody font-poppins cursor-pointer">
<div onClick={() => { handleExpand(item.voucherId);
                handleSetNewParticularRowData(item);
                props.handlePExpenseVoucherIdDrawer(true);}}>
         {item.voucherId}
         </div>
         </h4>

</Tooltip>
<div className=" flex font-medium flex-col w-[12rem] ">
                                    <h4 class=" text-xs text-cardBody font-poppins"></h4>

                                    <div class=" text-xs text-cardBody font-poppins">
         
            
              
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
<div className=" flex font-medium flex-col  w-52 ">
                           
                           <h4 class=" text-sm text-cardBody font-poppins"> Voucher Date </h4>
                           <h4 class=" text-xs text-cardBody font-poppins">
                               
                           
                           {dayjs(item.voucherDate).format("MMM Do YY")}

                           </h4>
                       </div>
                       <div className=" flex font-medium flex-col w-32 ml-2 ">
                                  

                                  <h4 class=" text-sm text-cardBody font-poppins">Amount</h4>
                                  <h4 class=" text-xs text-cardBody font-poppins">
                                      € {item.amount}
                                  </h4>
                              </div>
                            
                        </div>

                        </div>
                    )
                })}
      </OnlyWrapCard>
      
      <PExpenseVoucherIdDrawer
        newvoucherId={newvoucherId} 
        newparticularRowData={newparticularRowData}
        pexpenseVoucherIdDrawer={pexpenseVoucherIdDrawer}
        handlePExpenseVoucherIdDrawer={handlePExpenseVoucherIdDrawer}
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
  rejectedExpenses:expense.rejectedExpenses,
  pexpenseVoucherIdDrawer:expense.pexpenseVoucherIdDrawer,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getExpenseById,
      handlePExpenseVoucherIdDrawer,
      getRejectdExpense
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseRejectedStatusCard);

