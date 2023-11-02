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

function ExpenseCard2(props) {
  const [expand, setExpand] = useState(false);
  const [voucherId, setvoucherId] = useState("");
  const [particularRowData, setParticularRowData] = useState({});

  function handleSetParticularRowData(item) {
    console.log(item);
    setParticularRowData(item);   
  }

  function handleExpand(voucherId) {
    setExpand(!expand);    
    setvoucherId(voucherId);
  }

  useEffect(() => {
    props.getExpenseById(props.userId);
  }, [props.userId]);

 
    const {
      Expenses,
      fetchingExpenseById,
      fetchingExpenseByIdError,
      expenseVoucherIdDrawer,
      handleExpenseVoucherIdDrawer,
    } = props;
  

    return (
      <>
      <div class=" h-h86 overflow-auto overflow-x-auto">
         <OnlyWrapCard>      
              {Expenses.map((item) => {
                 return (
                  <div>
                  <div className="flex justify-between mt-4 max-sm:flex-col"
                      style={{
                          borderBottom: "3px dotted #515050"
                      }}>
                          <h4 class=" text-sm text-cardBody font-poppins">
                                 Name
                                  </h4> 
                      <div className=" flex font-medium flex-col md:w-72 max-sm:w-full justify-between max-sm:flex-row  ">

                         
                              <Tooltip >
                                <div  class=" flex max-sm:w-full justify-between max-sm:flex-row md:flex-col ">
                                  <h4 class=" text-sm text-cardBody font-poppins">
                                  Voucher ID
                                  </h4>
                                  <h4 class=" text-xs text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
<div onClick={() => { handleExpand(item.voucherId);
                handleSetParticularRowData(item);
                props.handleExpenseVoucherIdDrawer(true);}}>
         {item.voucherId}
         </div>
         </h4>
         </div>
</Tooltip>

</div>
<div className=" flex font-medium flex-col  md:w-52 max-sm:w-full justify-between max-sm:flex-row ">
                           
                           <h4 class=" text-sm text-cardBody font-poppins"> Voucher Date </h4>
                           <h4 class=" text-xs text-cardBody font-poppins">
                               
                           
                           {dayjs(item.voucherDate).format("MMM Do YY")}

                           </h4>
                       </div>
                       <div className=" flex font-medium flex-col md:w-32 max-sm:w-full justify-between max-sm:flex-row ">
                                  

                                  <h4 class=" text-sm text-cardBody font-poppins">Amount</h4>
                                  <h4 class=" text-xs text-cardBody font-poppins">
                                      € {item.amount}
                                  </h4>
                              </div>
                              <div className=" flex font-medium flex-col md:w-[12rem] max-sm:w-full justify-between max-sm:flex-row ">
                                    <h4 class=" text-sm text-cardBody font-poppins">Status</h4>

                                    <div class=" text-xs text-cardBody font-poppins">
                                    {item.status === "Approved" && (
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
              )}
            
              {item.status === "Rejected" && (
                <div
                style={{
                  border: "2px solid red",
                  padding: "0px 0.62em",
                  textAlign: "center",
                  margin: "2px",
                  borderRadius: "0.62em",
                }}
              >
                <div className="text-[red]">{item.status}</div></div>
              )}
              {item.status === "Pending" && (
                  <div
                  style={{
                    border: "2px solid #e1d16c",
                    padding: "0px 0.62em",
                    textAlign: "center",
                    margin: "2px",
                    borderRadius: "0.62em",
                    width:"11rem"
                  }}
                >
                 <div className="text-[#e1d16c]"> Waiting for approval</div>
                  </div>
              )}
                                    </div>
                                    </div>
                        </div>

                        </div>
                    )
                })}
      </OnlyWrapCard>
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
  expenseVoucherIdDrawer:expense.expenseVoucherIdDrawer
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getExpenseById,
      handleExpenseVoucherIdDrawer
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseCard2);
