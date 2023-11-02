import dayjs from "dayjs";
import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { StyledLabel } from '../../../Components/UI/Elements'
import { StyledTable,StyledPopconfirm } from "../../../Components/UI/Antd";
import { getMileageByUserId,getPendingMileage,deleteMileageVoucher,handleMileageVoucherIdDrwer } from "../MileageAction";
import { CurrencySymbol } from "../../../Components/Common";
import styled from 'styled-components'
import { FlexContainer,OnlyWrapCard } from '../../../Components/UI/Layout'
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import { DeleteOutlined,UpCircleOutlined } from "@ant-design/icons";
import MileageVoucherIdDrawer from "./MileageVoucherIdDrawer";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


class MileagePendingStatusCard extends React.Component {
  state = {
    expand: false,
    voucherId: "",
    pageNo:0,
  };
  handleExpand = (vid) => {
    console.log("function called");
    this.setState({
      expand: !this.state.expand,
      voucherId: vid,
    });
  };
  componentDidMount() {
    // this.props.getMileageByUserId(this.props.userId);
    this.setState({pageNo:this.state.pageNo + 1});
    this.props.getPendingMileage(this.props.userId,this.state.pageNo);
  }
  render() {
    const {
      MileageDat,
      pendingMileages,
    } = this.props;

    return (
      <>
        
      <OnlyWrapCard className="h-[32rem]">
      <div className="p-0.5 inline-flex items-center rounded-md w-max ml-1">
            <span className="pl-2 pr-4 relative">
              <span
                className="absolute left-0 top-0 bottom-0 w-3  rounded-l-md -mt-1 -mb-1 -ml-2 "

              ></span>
              <span class="font-semibold text-sm text-cardBody-heading font-poppins"> Pending </span>
            </span>
          </div>   
      {pendingMileages.map((item) => { 
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
                                                
                                            <div onClick={() => { this.handleExpand(item.voucherId) 
                this.props.handleMileageVoucherIdDrwer(true)}}>
         {item.voucherId}
         </div>
                                            </h4>

                                        </Tooltip>
                                        <div className=" flex font-medium flex-col w-max ">
                                    <h4 class=" text-xs text-cardBody font-poppins"></h4>

                                    <div class=" text-xs text-cardBody font-poppins">
         
            
              
                                    <div
                  style={{
                    border: "2px solid #e1d16c",
                    padding: "0px 0.62em",
                    textAlign: "center",
                    margin: "2px",
                    borderRadius: "0.62em",
                    width:"max-content"
                  }}
                >
                  <div className="text-[#e1d16c]">Waiting for approval</div>
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
                                <div className=" flex font-medium flex-col w-36 ">
                                  

                                    <h4 class=" text-sm text-cardBody font-poppins">Amount</h4>
                                    <h4 class="  text-xs text-cardBody font-poppins">
                                        € {item.amount}
                                    </h4>
                                </div>
                     
                              


                                <div class="flex flex-col w-[4%]">
                
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
             {/* {item.status==="Rejected" && (
            <Button type="primary"
            onClick={()=>{
              // this.props.reapply();
            }}>
            Reapply
            </Button>
          )} */}
              </div>

                    </div>
                    </div>
                              
                            </div>
                        </div>


                    )
                })}
      </OnlyWrapCard>




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
  pendingMileages:mileage.pendingMileages,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMileageByUserId,
      deleteMileageVoucher,
      handleMileageVoucherIdDrwer,
      getPendingMileage
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MileagePendingStatusCard);