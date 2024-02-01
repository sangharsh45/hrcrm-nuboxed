import React, { useEffect,lazy, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Tooltip } from "antd";
import { getExpenseById,handleExpenseVoucherIdDrawer,getApprovedExpense } from "../ExpenseAction";
import dayjs from "dayjs";
const ExpenseVoucherIdDrawer=lazy(()=>import("./ExpenseVoucherIdDrawer"));



function ExpenseApprovedStatusCard(props) {
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
    props.getApprovedExpense(props.userId,pageNo);
  }, [props.userId]);

 
    const {
      approvedExpenses,
      expenseVoucherIdDrawer,
      handleExpenseVoucherIdDrawer,
    } = props;

    return (
      <>
        <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
         <div className="p-0.5 inline-flex items-center rounded-md w-max ml-1">
            <span className="pl-2 pr-4 relative">
              <span
                className="absolute left-0 top-0 bottom-0 w-3  rounded-l-md -mt-1 -mb-1 -ml-2 "

              ></span>
              <span class="font-semibold text-sm text-cardBody-heading font-poppins"> Approved </span>
            </span>
          </div>    
              {approvedExpenses.map((item) => {
                 return (
                  <div>
                  <div className="flex justify-between mt-4"
                      style={{
                          borderBottom: "3px dotted #515050"
                      }}>
                         
                      <div className=" flex font-medium flex-col w-64 mb-1 ">

                         
                              <Tooltip >
                                  <h4 class=" text-sm text-cardBody font-poppins">
                                  Voucher ID
                                  </h4>
                                  <h4 class=" text-xs text-blue-500 text-cardBody font-poppins cursor-pointer">
<div onClick={() => { handleExpand(item.voucherId);
                handleSetParticularRowData(item);
                props.handleExpenseVoucherIdDrawer(true);}}>
         {item.voucherId}
         </div>
         </h4>

</Tooltip>
<div className=" flex font-medium flex-col w-[9rem] ">  
                                    <div class=" text-xs text-cardBody font-poppins">
                                    <div
                 style={{
                   border: "2px solid green",
                   padding: "0px 0.62em",
                   textAlign: "center",
                   margin: "2px",
                   borderRadius: "0.62em",
                 }}
               >
                 <div className="text-[green]">{item.status}</div>
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
      </div>
      

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
  approvedExpenses:expense.approvedExpenses
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getExpenseById,
      handleExpenseVoucherIdDrawer,
      getApprovedExpense
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseApprovedStatusCard);

