import React, { Component, useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import { SearchOutlined,
} from '@ant-design/icons';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Empty, Tooltip, Input, Button, Avatar } from "antd";
import { StyledTable, StyledPopconfirm } from "../../../../Components/UI/Antd";
import {
  deleteEvent, getEventListRangeByUserId,
  handleUpdateEventModal,
  setEditEvents,
} from "../../EventAction";
import { getEmployeelist } from "../../../Employees/EmployeeAction";
import { getAllSalesList} from "../../../Opportunity/OpportunityAction";
import EventNoteIcon from '@mui/icons-material/EventNote';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { OnlyWrapCard } from '../../../../Components/UI/Layout';
import { MultiAvatar2, SubTitle } from "../../../../Components/UI/Elements";
import { BundleLoader } from "../../../../Components/Placeholder";
const UpdateEventModal = lazy(() => import("../UpdateEventModal"));

function EventCardList (props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    const {
      getEventListRangeByUserId,
          userDetails: { employeeId },
         } = props;
         getEventListRangeByUserId(employeeId,page);
        setPage(page + 1);
        props.getEmployeelist();
    props.getAllSalesList();;
  }, []);
 ;

 const handleLoadMore = () => {
    const {
      getEventListRangeByUserId,
          userDetails: { employeeId },
         } = props;
         getEventListRangeByUserId(employeeId,page);
        setPage(page + 1);
        props.getEmployeelist();
    props.getAllSalesList();;
}


    const {
      fetchingEventListRangeByUserId,
      fetchingEventListRangeByUserIdError,
      eventListRangeByUserId,
      deleteEvent,
      setEditNoteEvent,
      updateEventModal,
      handleUpdateEventModal,
      userDetails: { employeeId },
    } = props;
    const assignToTypeOption = props.employees.map((item) => {
      return {
        text: item.assignToName,
        value: item.assignToName,
      };
    });
   const ownerlistType = props.sales.map((sales) => {
          return {
            text: sales.fullName || "",
            value: sales.fullName,
          };
        });
  
// if (fetchingEventListRangeByUserId) 
//    {
//     return <BundleLoader/>
//    }
    return (
      <>
        <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
       <InfiniteScroll
        dataLength={eventListRangeByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingEventListRangeByUserId?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
         <div className=" flex justify-between w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[12rem]">Type</div>
        <div className=" md:w-40">Subject</div>
        <div className=" md:w-28 ">Start</div>
        <div className=" md:w-28 ">End</div>
        <div className="md:w-36">Team</div>
        <div className="md:w-24">Include</div>
        <div className="md:w-[3%]"></div>
        <div className="md:w-[5%]">Rating</div>
        <div className="md:w-24">Assigned To</div>
        <div className="md:w-24">Owner</div>
        <div className="w-12">Action</div>
      </div>
      {eventListRangeByUserId.map((item) => { 
                    return (
                        <div>
                            <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3"
                                style={{
                                    // borderBottom: "3px dotted #515050"
                                }}>
                                     <div class="flex">
                                <div className=" flex font-medium flex-col w-52 max-sm:w-full ">
<div className="flex max-sm:w-full"> 
          <div class="max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex max-sm:justify-between flex-row w-full md:flex-col">
                                            {/* <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-[0.82rem] text-cardBody font-poppins cursor-pointer">                                       
                                            {item.eventType}
       
                                            </div>
                                               </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex font-medium flex-col  md:w-20 max-sm:flex-row  w-full ">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-[0.875rem] font-poppins max-sm:hidden"> Subject </div> */}
                                    <div class=" text-[0.82rem] text-cardBody font-poppins">   
                                    {item.eventSubject}
                                    </div>
                                </div>
                                </div>
                                <div class="flex">
                                <div className=" flex font-medium flex-col md:w-40 max-sm:flex-row  w-full">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Start</div> */}
                                    <div class="text-[0.82rem] text-cardBody font-poppins">
                                    {` ${moment(item.startDate).format("llll")}`}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-40 max-sm:flex-row  w-full">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">End</div> */}
                                    <div class="text-[0.82rem] text-cardBody font-poppins">
                                    {` ${moment(item.startDate).format("llll")}`}
                                    </div>
                                </div>
                               
                                <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row  w-full ">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Include</div> */}

                                    <div class=" text-[0.82rem] text-cardBody font-poppins">
                                    <Avatar.Group
                   maxCount={7}
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                {item.included &&
                  item.included.map((candidate, i) => {
                     const data1 = candidate.fullName
                     .slice(0,2)
                     .split("")[0]
                     .toUpperCase();
                   console.log("datas", data1);
                    return (
                      <Avatar style={{ backgroundColor: "#f56a00" }}>
                      {data1}
                    
                    </Avatar>
                     

                   
                    );
                  })}
            </Avatar.Group>
                                    </div>
                                </div>
                                <div className="flex font-medium flex-col md:w-48 max-sm:flex-row  w-full ">
                                    {/* <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Assigned To</div> */}

                                    <div class="text-[0.82rem] text-cardBody font-poppins">
                                    <Tooltip title={item.assignedToName}>
              <SubTitle>
                <MultiAvatar2
                  primaryTitle={item.assignedToName}
                  imageId={item.imageId}
                  imageURL={item.imageURL}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              </SubTitle>
             </Tooltip>
                                    </div>
                                </div>
                                </div>
                                <div class="flex">
                               
                                <div className="flex font-medium flex-col md:w-48 max-sm:flex-row  w-full ">
                       
                       {/* <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Owner</div> */}

                   <div class="max-sm:flex justify-end">
              <Tooltip title={item.ownerName}>
            <SubTitle>
              <MultiAvatar2
              primaryTitle={item.woner}
              imageId={item.ownerImageId}
              imageURL={item.imageURL}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            </SubTitle>
          </Tooltip>
          </div>
                   </div>
                                <div class="flex  md: max-sm:flex-row items-center justify-between w-full">
                    <div class="">
                    {item.rating === 0 ? (<StarBorderIcon
                style={{ color: "#eeeedd", fontSize: "1.5em" }} />)
                : (
                  <span>
                    {item.rating}{<StarBorderIcon 
                      style={{ color: "#FFD700", fontSize: "1.5em" }} />}
                  </span>)}
                        </div>
                        <div>
                        {item.completionInd === false ? (
                <CheckCircleIcon 
               
                  style={{
                    color: "#eeeedd",
                    fontSize: "1.5em"
                  }} />
              ) : (
                <span><CheckCircleIcon 
                  style={{ color: "#67d239", fontSize: "1.5em" }} />
                </span>
              )}
        
                        </div>
                        <div>
                        <Tooltip title={item.eventDescription}>  
                        <EventNoteIcon
                        style={{ cursor: "pointer", fontSize:"0.8rem"}}/>
                        </Tooltip>
                    </div>
                    </div>
                    
                    <div class="flex flex-col md: max-sm:flex-row justify-evenly items-center w-full">
       
          <Tooltip title="Edit">
              <BorderColorIcon
                type="edit"
                style={{ cursor: "pointer", fontSize:"0.8rem"}}
                onClick={() => {
                  props.setEditEvents(item);
                  handleUpdateEventModal(true);
                }}
              />
            </Tooltip>
          
            <div>
           
            <StyledPopconfirm
              // title="Do you want to delete?"
              title={<FormattedMessage id="app.doyouwanttodelete" defaultMessage="Do you want to delete" />}
              onConfirm={() => deleteEvent(item.eventId, employeeId)}
            >
              <DeleteIcon  type="delete" style={{ cursor: "pointer",color:"red",fontSize:"0.8rem" }} />
            </StyledPopconfirm>
      
            </div>
                      </div>   
                      </div> 
                            </div>
                        </div>


                    )
                })}
                   </InfiniteScroll>
      </OnlyWrapCard>
     
        <UpdateEventModal
          updateEventModal={updateEventModal}
          handleUpdateEventModal={handleUpdateEventModal}
        />
      </>
    );
  }

const mapStateToProps = ({ auth, event, employee,opportunity}) => ({
  userDetails: auth.userDetails,
  fetchingEventListRangeByUserId: event.fetchingEventListRangeByUserId,
  fetchingEventListRangeByUserIdError:
    event.fetchingEventListRangeByUserIdError,
  eventListRangeByUserId: event.eventListRangeByUserId,
  updateEventModal: event.updateEventModal,
  employees: employee.employees,
  sales: opportunity.sales,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEventListRangeByUserId,
      deleteEvent,
      handleUpdateEventModal,
      setEditEvents,
      getEmployeelist,
      getAllSalesList,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EventCardList);
function NoDataComponent(props) {
  const { description, onClick, buttonText } = props;
  return (
    <div>
      <div class=" flex flex-col items-center justify-center"
      >
        <p>{description || "We couldn't find relevant data"}</p>
      </div>
    </div>
  );
}

