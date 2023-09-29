import dayjs from "dayjs";
import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { StyledLabel } from '../../../Components/UI/Elements'
import { StyledTable,StyledPopconfirm } from "../../../Components/UI/Antd";
import { getMileageByUserId,deleteMileageVoucher,handleMileageVoucherIdDrwer } from "../MileageAction";
import { CurrencySymbol } from "../../../Components/Common";
import styled from 'styled-components'
import { FlexContainer,OnlyWrapCard } from '../../../Components/UI/Layout'
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import { DeleteOutlined,UpCircleOutlined } from "@ant-design/icons";
import MileageVoucherIdDrawer from "./MileageVoucherIdDrawer";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const MileageTable2=lazy(()=>import("./MileageTable2"));

class MileageCard2 extends React.Component {
  state = {
    expand: false,
    voucherId: "",
  };
  handleExpand = (vid) => {
    console.log("function called");
    this.setState({
      expand: !this.state.expand,
      voucherId: vid,
    });
  };
  componentDidMount() {
    this.props.getMileageByUserId(this.props.userId);
  }
  render() {
    const {
      MileageDat,
      fetchingMileageByUserId,
      fetchingMileageByUserIdError,
    } = this.props;

    return (
      <>
         <div class=" h-h86 overflow-auto overflow-x-auto">
      <OnlyWrapCard>
      {MileageDat.map((item) => { 
                    return (
                        <div>
                            <div className="flex justify-between mt-4"
                                style={{
                                    borderBottom: "3px dotted #515050"
                                }}>
                                     
                                <div className=" flex font-medium flex-col w-72 ">

                                   
                                        <Tooltip >
                                            <h4 class=" text-sm text-cardBody font-poppins">
                                            Voucher ID
                                            </h4>
                                            <h4 class=" text-xs text-blue-500 text-cardBody font-poppins cursor-pointer">
                                                
                                            <div onClick={() => { this.handleExpand(item.voucherId) 
                this.props.handleMileageVoucherIdDrwer(true)}}>
         {item.voucherId}
         </div>
                                            </h4>

                                        </Tooltip>
                              
                                </div>

                                <div className=" flex font-medium flex-col  w-52 ">
                           
                                    <h4 class=" text-sm text-cardBody font-poppins"> Voucher Date </h4>
                                    <h4 class=" text-xs text-cardBody font-poppins">
                                        
                                    
                                    {dayjs(item.voucherDate).format("MMM Do YY")}

                                    </h4>
                                </div>
                                <div className=" flex font-medium flex-col w-36 ">
                                  

                                    <h4 class=" text-sm text-cardBody font-poppins">Amount</h4>
                                    <h4 class=" text-xs text-cardBody font-poppins">
                                        € {item.amount}
                                    </h4>
                                </div>
                                {/* <div className=" flex font-medium flex-col w-20 ">
                       
                                    <h4 class=" text-xs text-cardBody font-poppins">Approve</h4>

                                    <h4 class=" text-xs text-cardBody font-poppins"
                                      onClick={() => {
                        props.handleLoadCarModal(true)
                         props.setRequirementsData(item);
                          }}
                          style={{
                            cursor: "pointer",
                            color: "#5986FB",
                          }}
                      
                                    >
                                        <u>Nixa</u>
                                    </h4>
                                </div> */}
                                <div className=" flex font-medium flex-col w-32 ">
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
                    width:"12rem"
                  }}
                >
                  <div className="text-[#e1d16c]">Waiting for approval</div></div>
              )}
                                    </div>
                                </div>


                                <div class="flex flex-col w-[4%]">
                    {/* <div style={{filter: "drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))"}} class="rounded-full bg-white w-5 h-5 cursor-pointer">
                      <EditIcon
                         style={{ color: "blue" ,display:"flex",justifyItems:"center",justifyContent:"center",fontSize:"0.75rem",marginTop:"0.25rem",marginLeft:"0.25rem"}}
          //               onClick={() => {
          //               props.handleDeleteModal(true);
          //               props.setRequirementsData(item);
          //               handleSetCurrentOrderId(item.orderId)
          // }} 
                        />
                        </div> */}
                        <div >
                        <div >
                           {item.status === "Pending" ? (
            <Tooltip title="Delete">
              <DeleteOutlined
                type="delete"
                style={{ cursor: "pointer" }}
                onClick={() => {
                this.props.deleteMileageVoucher(item.voucherId);
                  
                }}
              />
            </Tooltip>
            ):null}
             {item.status==="Rejected" && (
            <Button type="primary"
            onClick={()=>{
              // this.props.reapply();
            }}>
            Reapply
            </Button>
          )}
              </div>

                    </div>
                    </div>
                              
                            </div>
                        </div>


                    )
                })}
      </OnlyWrapCard>
      </div>



        <MileageVoucherIdDrawer 
        voucherId={this.state.voucherId}
        mileageVoucherIdDrawer={this.props.mileageVoucherIdDrawer}
        handleMileageVoucherIdDrwer={this.props.handleMileageVoucherIdDrwer}
        />
      </>
    );
  }
}
const mapStateToProps = ({ auth, mileage }) => ({
  userId: auth.userDetails.userId,
  MileageDat: mileage.MileageDat,
  fetchingMileageByUserId: mileage.fetchingMileageByUserId,
  fetchingMileageByUserIdError: mileage.fetchingMileageByUserIdError,
  mileageVoucherIdDrawer:mileage.mileageVoucherIdDrawer,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMileageByUserId,
      deleteMileageVoucher,
      handleMileageVoucherIdDrwer
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MileageCard2);