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
  setTimeout(() => {
    const {
      getEventListRangeByUserId,
          userDetails: { employeeId },
         } = props;
         getEventListRangeByUserId(employeeId,page);
        setPage(page + 1);
        props.getEmployeelist();
    props.getAllSalesList();;
  
  }, 100);

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
  
if (fetchingEventListRangeByUserId) 
   {
    return <BundleLoader/>
   }
    return (
      <>
        <InfiniteScroll
                dataLength={eventListRangeByUserId.length}
                next={handleLoadMore}
                hasMore={true}
               
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                height={600}
            >
        <OnlyWrapCard>
      {eventListRangeByUserId.map((item) => { 
                    return (
                        <div>
                            <div className="flex justify-between mt-4"
                                style={{
                                    borderBottom: "3px dotted #515050"
                                }}>
                                     
                                <div className=" flex font-medium flex-col w-52 ">
<div className="flex"> 
          <div>
                                        <Tooltip>
                                            <div class="text-[0.875rem] text-cardBody font-poppins">
                                            Type
                                            </div>
                                            <div class="text-[0.75rem] text-cardBody font-poppins cursor-pointer">                                       
                                            {item.eventType}
       
                                            </div>

                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex font-medium flex-col  w-52 ">
                                    <div class=" text-[0.875rem] text-cardBody font-[0.875rem] font-poppins"> Subject </div>
                                    <div class=" text-[0.75rem] text-cardBody font-poppins">   
                                    {item.eventSubject}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col w-40">
                                    <div class=" text-[0.875rem] text-cardBody font-poppins">Start</div>
                                    <div class="text-[0.75rem] text-cardBody font-poppins">
                                    {` ${moment(item.startDate).format("llll")}`}
                                    </div>
                                </div>
                                {/* <div className=" flex font-medium flex-col w-36 ">
                                  <div class="text-[0.875rem] text-cardBody font-poppins">Team</div>
                                  <div class="text-[0.75rem] text-cardBody font-poppins">
                                  <span>
                {item.candidateName === null ? (
                ""
              ) : (
                  <MultiAvatar2
                    primaryTitle={item.candidateName}
                    imageId={item.ownerImageId}
                    imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
              )}
                </span>
                                  </div>
                              </div> */}
                                <div className=" flex font-medium flex-col w-32 ">
                                    <div class=" text-[0.875rem] text-cardBody font-poppins">Include</div>

                                    <div class=" text-[0.75rem] text-cardBody font-poppins">
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
                                <div className="flex font-medium flex-col w-32 ">
                                    <div class="text-[0.875rem] text-cardBody font-poppins">Assigned To</div>

                                    <div class="text-[0.75rem] text-cardBody font-poppins">
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
                                <div className="flex font-medium flex-col w-20 ">
                       
                       <div class="text-[0.875rem] text-cardBody font-poppins">Owner</div>

                   
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
                                <div class="flex flex-col w-[3%]">
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
                    <div class="flex flex-col w-[2%]">
       
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


                    )
                })}
      </OnlyWrapCard>
        </InfiniteScroll>
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