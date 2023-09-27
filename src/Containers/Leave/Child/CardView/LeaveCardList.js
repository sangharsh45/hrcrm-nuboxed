import React, { Component, useEffect, useState, useMemo, lazy } from "react";
import { MultiAvatar2, } from '../../../../Components/UI/Elements'
import { FlexContainer, OnlyWrapCard } from '../../../../Components/UI/Layout'
import {  Button, Tooltip } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Select } from "antd";
import styled from 'styled-components'
import { EditOutlined,DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { BundleLoader } from "../../../../Components/Placeholder";
import { getLeaveListRangeByUserId,
    updateLeaves,
    setEditLeave,
    handleUpdateLeaveModal,
    } from "../../LeavesAction";
    import UpdateLeavesModal from "../Tab/UpdateLeavesModal";
const { Option } = Select;
function LeaveCardList (props) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    props.getLeaveListRangeByUserId(props.userId);
   
  }, []);


  const [currentLeaveId, setCurrentLeaveId] = useState("");

   function handleSetCurrentLeaveId(leaveId) {
    setCurrentLeaveId(leaveId);
    console.log(leaveId);
  }
  if (props.fetchingLeaveListRangeByUserId) {
    return <BundleLoader/>
  
    
;
  }
  const {
    leaveListRangeByUserId,
    fetchingLeaveListRangeByUserId,
    fetchingLeaveListRangeByUserIdError,
    handleUpdateLeaveModal,
    updateLeaveModal,
    
    // fetchingBankDetails,
    // bank,
    // handleUpdateBankModal,
    // updateBankModal,
    // setEditBank,
  } = props;

    return (
      
            <>
            

           <OnlyWrapCard style={{height:"70vh"}}>
        {/* <InfiniteScroll
                    dataLength={props.tableRequirement.length}
                next={handleLoadMore}
                hasMore={true}
                height={"20vh"}
            > */}
       
 
        {props.leaveListRangeByUserId.map((item) => {
            const currentdate = moment().format("DD/MM/YYYY");
            const date = moment(item.creationDate).format("DD/MM/YYYY");
       
          return (
            <>




              <div>
                <div className="flex justify-between mt-2 "
                  // style={hrStyle}
                  style={{
                    borderBottom: "3px dotted #515050"
                  }}
                >
                  <div class=" flex flex-row justify-evenly w-wk">
                    <div className=" flex font-medium flex-col w-44 ">

                    <div class=" text-xs text-cardBody font-medium font-poppins">
         
                    Start Date
         
            </div> 
         
        
            <div class=" font-normal text-xs text-cardBody font-poppins">
   {` ${moment.utc(item.startDate).format("ll")}`}
   </div>
          
                    </div>
                  
                    <div className=" flex font-medium flex-col w-40">

                      <div class=" text-xs text-cardBody font-medium font-poppins">
                      End Date
                      </div>

                            
            <div class=" font-normal text-xs text-cardBody font-poppins">
   {` ${moment.utc(item.endDate).format("ll")}`}
   </div>
          
                      {/* </Tooltip>   */}
                    </div>
                    <div className=" flex font-medium flex-col w-40">
             

                        <div class=" text-xs text-cardBody font-medium font-poppins">
                        Cover
                        </div>

                        <div class=" font-normal text-xs text-cardBody font-poppins">
                          {item.coverDetails}
                        </div>
                     
                    </div>
                    <div className=" flex font-medium flex-col w-40">
                    

                        <div class=" text-xs text-cardBody font-medium font-poppins">
                        Reason
                        </div>

                        <div class=" font-normal text-xs text-cardBody font-poppins">
                          {item.reason}
                        </div>
                   
                    </div>
 
     <div className=" flex font-medium flex-col w-48 ">
                                    <h4 class=" text-xs text-cardBody font-poppins">Status</h4>

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
                    border: "2px solid #e1d16c",
                    padding: "0px 0.62em",
                    textAlign: "center",
                    margin: "2px",
                    borderRadius: "0.62em",
                    width:"12rem"
                  }}
                >
                 <div className="text-[#e1d16c]"> Waiting for approval</div>
                  </div>
              )}
                                    </div>
                                </div>
                                <div class="flex flex-col w-20">
                    <div >
                    {item.status === "Pending" ? 
            <Tooltip title="Edit">
                    <EditOutlined
           type="edit"
           style={{ cursor: "pointer" }}
           onClick={() => {
            props.setEditLeave(item);
             handleUpdateLeaveModal(true);
             handleSetCurrentLeaveId(item.leaveId);
             
           }}
            
          >
           
          </EditOutlined>
          </Tooltip>
            :""}
                        </div>
                        <div >
                        <div >
                           {item.status === "Pending" ? (
            <Tooltip title="Delete">
             <DeleteOutlined
         type="delete"
         style={{ cursor: "pointer" }}
            // onClick={() => {
            //   // props.getProviderById(item.serviceId);
            //   props.handleDrawerContactlistModal(true);
            //   handleRowData(item);
            //   handleSetCurrentProvider(item.name);
            // }}
            
          >
           
          </DeleteOutlined>
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
 
              </div>

            </>

          )
        })}
      
        {/* </InfiniteScroll> */}

      </OnlyWrapCard >
            
              <UpdateLeavesModal
        leaveId={currentLeaveId}
        updateLeaveModal={updateLeaveModal}
        handleUpdateLeaveModal={handleUpdateLeaveModal}
        handleSetCurrentLeaveId={handleSetCurrentLeaveId}
        />
            </>
      
    
    )
              
}

const mapStateToProps = ({ leave, auth }) => ({
    userId: auth.userDetails.userId,
    fetchingLeaveListRangeByUserId: leave.fetchingLeaveListRangeByUserId,
    fetchingLeaveListRangeByUserIdError:
      leave.fetchingLeaveListRangeByUserIdError,
    leaveListRangeByUserId: leave.leaveListRangeByUserId,
    // fetchingBankDetails: profile.fetchingBankDetails,
    updateLeaveModal:leave.updateLeaveModal,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getLeaveListRangeByUserId,
        updateLeaves,
        setEditLeave,
        handleUpdateLeaveModal,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(LeaveCardList)

const MainWrapper = styled.div`
  /* */
  margin: 0px 20px;
  @media only screen and (max-width: 600px) {
  }
`
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  
  @media only screen and (max-width: 600px) {
    -webkit-justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
`
const CardElement = styled.div`
 
border-radius: 0.75rem;
    border: 3px solid #EEEEEE;
    background-color: rgb(255,255,255);
    box-shadow: 0 0.25em 0.62em #aaa;
    height: 7rem;
    color: rgb(68,68,68);
    margin: 1em;
    padding: 0.2rem;
    width: 15vw;
    display: flex;
    flex-direction: column;
  @media only screen and (max-width: 600px) {
    width: 100%;
    
  }
`
const CardDescription = styled.div`
  
  @media only screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column
  }
`
const CardImage = styled.div`
  
  width:200;
  display:flex;
  height:200
  @media only screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column
  }
`
const WithOutImage = styled.div`
  
  width:200px;
  height:200px;
  display:flex;
    align-items: center;
    flex-direction:column
  @media only screen and (max-width: 600px) {
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column
  }
`

const Header = styled.div`
  text-overflow: ellipsis;

  white-space: nowrap;
  overflow: hidden;
  height: 2em;
  font-size: 1em;
padding:4px;
  color:blue;
  cursor:pointer;
  // font-family: Poppins;
  //font-weight: 700;
  @media only screen and (max-width: 600px) {
    text-overflow: ellipsis;

white-space: nowrap;
overflow: hidden;
height: 2em;
font-size: 1.3em;
font-family: Poppins;
font-weight: 700;
width:100%

text-align:center
  }
`
const Desc = styled.p`
  height: 0px;
`
const Price = styled.div`
  height: 1.5em;
  font-weight: 700;
  font-family: Poppins;
  font-size: 1em;
  white-space: nowrap;
`

const AppIcon = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "123%" }}
  ></i>
);

const AppIcon1 = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "145%" }}
  ></i>
);

const PulseIcon = styled(AppIcon)`
  color: #df9697;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
const PulseIcon1 = styled(AppIcon1)`
  color: green;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;