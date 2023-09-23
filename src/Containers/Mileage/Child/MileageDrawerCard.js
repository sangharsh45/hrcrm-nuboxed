import dayjs from "dayjs";
import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { StyledLabel } from '../../../Components/UI/Elements'
import { StyledTable,StyledPopconfirm } from "../../../Components/UI/Antd";
import { getMileageByVoucherId,handleUpdateMileageModal,
    setEditMileage,updateMileage,deleteMileage} from "../MileageAction";
import { CurrencySymbol } from "../../../Components/Common";
import styled from 'styled-components'
import { FlexContainer,OnlyWrapCard } from '../../../Components/UI/Layout'
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import { DeleteOutlined,EditOutlined } from "@ant-design/icons";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import moment from "moment";
const UpdateMileageModal=lazy(()=>import("../Child/UpdateMileageModal"));


class MileageDrawerCard extends React.Component {
    componentDidMount() {
        const { voucherId } = this.props;
        this.props.getMileageByVoucherId(voucherId);
      }
    
      componentDidUpdate(prevProps, prevState, snapshot) {
        const { voucherId } = this.props;
        if (this.props.voucherId !== prevProps.voucherId) {
          this.props.getMileageByVoucherId(voucherId);
        }
      }

  render() {
    const {mileageVoucherId,handleUpdateMileageModal,updateMileageModal,currentMileageId}=this.props;

    return (
      <>
        
      <OnlyWrapCard>
      {mileageVoucherId.map((item) => { 
                    return (
                        <div>
                            <div className="flex justify-between mt-4"
                                style={{
                                    borderBottom: "3px dotted #515050"
                                }}>
                                     
                                <div className=" flex font-medium flex-col w-10 ">

                                   
                                      
                                            <h4 class=" text-base text-cardBody font-poppins">
                                            ID 
                                            </h4>
                                            <h4 class=" text-base text-blue-500 text-cardBody font-poppins cursor-pointer">
                                                
                                            {/* <div onClick={() => { this.handleExpand(item.voucherId) 
                this.props.handleMileageVoucherIdDrwer(true)}}>
       
         </div> */}
           <Tooltip title={item.mileageId} >
           <QuestionMarkIcon/>
           </Tooltip>
           
                                            </h4>

                                        
                              
                                </div>
                                <div className=" flex font-medium flex-col  w-32 ">
                           
                           <h4 class=" text-base text-cardBody font-poppins"> Attributed To </h4>
                           <h4 class=" text-base text-cardBody font-poppins">
                               {item.clientName}
                           </h4>
                       </div>
                                <div className=" flex font-medium flex-col  w-32 ">
                           
                                    <h4 class=" text-base text-cardBody font-poppins">Date </h4>
                                    <h4 class=" text-base text-cardBody font-poppins">
                                        
                                    
                                    {dayjs(item.mileageDate).format("MMM Do YY")}

                                    </h4>
                                </div>
                                <div className=" flex font-medium flex-col w-32 ">
                                  
                                    <h4 class=" text-base text-cardBody font-poppins">From</h4>
                                    <h4 class=" text-base text-cardBody font-poppins">
                                         {item.fromLocation}
                                    </h4>
                                </div>
                                <div className=" flex font-medium flex-col w-32 ">
                                  
                                  <h4 class=" text-base text-cardBody font-poppins">To</h4>
                                  <h4 class=" text-base text-cardBody font-poppins">
                                       {item.toLocation}
                                  </h4>
                              </div>
                              <div className=" flex font-medium flex-col w-32 ">
                                  
                                  <h4 class=" text-base text-cardBody font-poppins">Distance</h4>
                                  <h4 class=" text-base text-cardBody font-poppins">
                                       {item.distances}
                                  </h4>
                              </div>
                              <div className=" flex font-medium flex-col w-32 ">
                                
                                <h4 class=" text-base text-cardBody font-poppins">Remarks</h4>
                                <h4 class=" text-base text-cardBody font-poppins">
                                     {item.remark}
                                </h4>
                            </div>
                                {/* <div className=" flex font-medium flex-col w-32 ">
                                    <h4 class=" text-base text-cardBody font-poppins">Status</h4>

                                    <div class=" text-base text-cardBody font-poppins">
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
                 {item.status}
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
                {item.status}</div>
              )}
              {item.status === "Pending" && (
                  <div
                  style={{
                    border: "2px solid yellow",
                    padding: "0px 0.62em",
                    textAlign: "center",
                    margin: "2px",
                    borderRadius: "0.62em",
                    width:"12rem"
                  }}
                >
                  Waiting for approval</div>
              )}
                                    </div>
                                </div> */}


                                <div class="flex flex-col w-[4%]">
                                {item.status === "Pending" ? (
                    <div >
                      <EditOutlined
                        //  style={{ color: "blue" ,display:"flex",justifyItems:"center",justifyContent:"center",fontSize:"0.75rem",marginTop:"0.25rem",marginLeft:"0.25rem"}}
                        type="edit"
                style={{ cursor: "pointer" }}
                onClick={() => {
                 this.props.setEditMileage(item);
                  handleUpdateMileageModal(true);
          }} 
                        />
                        </div>
                                ) : null}
                        <div >
                        <div >
                           {item.status === "Pending" ? (
            <Tooltip title="Delete">
              <DeleteOutlined
                type="delete"
                style={{ cursor: "pointer" }}
                onClick={() => {
                this.props.deleteMileage(item.mileageId);
                  
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




      <UpdateMileageModal
        mileageId={currentMileageId}
        updateMileageModal={updateMileageModal}
        handleUpdateMileageModal={handleUpdateMileageModal}
        />
      </>
    );
  }
}
const mapStateToProps = ({ auth, mileage }) => ({
    fetchingMileageByVoucherId: mileage.fetchingMileageByVoucherId,
    fetchingMileageByVoucherIdError: mileage.fetchingMileageByVoucherIdError,
    mileageVoucherId: mileage.mileageVoucherId,
    updateMileageModal:mileage.updateMileageModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getMileageByVoucherId,
        handleUpdateMileageModal,
        setEditMileage,
        updateMileage,
        deleteMileage,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MileageDrawerCard);