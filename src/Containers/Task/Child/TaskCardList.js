import React, { useState,lazy,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import TaskStatusToggle from "../Child/TaskStatusToggle";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import FeedbackIcon from '@mui/icons-material/Feedback';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { OnlyWrapCard } from '../../../Components/UI/Layout';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import AddTaskProjectDrawerModal from "../Child/AddTaskProjectDrawerModal";
import { Tooltip, Input, Button, Avatar,FloatButton } from "antd";
import moment from "moment";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledPopconfirm, StyledTable } from "../../../Components/UI/Antd";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getTaskListRangeByUserId,
  deleteTask,
  linkTaskStatus,
  approveTaskByTaskId,
  rejectTaskByTaskId,
  handleUpdateTaskModal,
  setEditTask,
  handleDownloadTaskModal,
  handleTaskNotesDrawerModal,
  handleTaskFeedbackDrawerModal,
  handleTaskProjectDrawerModal,
  handleTaskopenModal
} from "../TaskAction";
import { MultiAvatar, StyledLabel } from "../../../Components/UI/Elements";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddTaskNotesDrawerModal from "./AddTaskNotesDrawerModal";
import OpenTaskModal from "./OpenTaskModal";
import DownloadTaskModal from "./DownloadTaskModal";
import AddTaskFeedbackDrawerModal from "./AddTaskFeedbackDrawerModal";
const UpdateTaskModal = lazy(() => import("./UpdateTaskModal"));
const ButtonGroup = Button.Group;

const TaskCardList = (props) => {
  const [data, setData] = useState("");
  const [data1, setData1] = useState("");
  const [currentNameId, setCurrentNameId] = useState("");

  const [currentprocessName, setCurrentprocessName] = useState("");
  const tab = document.querySelector('.ant-layout-sider-children');
  const tableHeight = tab && tab.offsetHeight * 0.75;

  
  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(page + 1);
    props.getTaskListRangeByUserId(props.employeeId,page);
    // props.getProviderCustomerData(props.provider.serviceId, page);
  }, []);
  const handleLoadMore = () => {
    setTimeout(() => {
      setPage(page + 1);
      props.getTaskListRangeByUserId(props.employeeId,page);
      // props.getProviderCustomerData(props.provider.serviceId, page);
    }, 100);
  };
  function handleSetCurrentProcessName(item) {
    setCurrentprocessName(item);
     console.log(item);
   }
  
  function handleSetTaskNameId(item) {
    setCurrentNameId(item);
  }
  
  const {
    fetchingTaskListRangeByUserId,
    fetchingTaskListRangeByUserIdError,
    taskListRangeByUserId,
    deleteTask,
    linkTaskStatus,
    difference,
    approveTaskByTaskId,
    rejectTaskByTaskId,
    handleUpdateTaskModal,
    handleDownloadTaskModal,
    handleTaskProjectDrawerModal,
    updateTaskModal,
    downloadTaskModal,
    addDrawerTaskNotesModal,
    addDrawerTaskFeedbackModal,
    handleTaskNotesDrawerModal,
    handleTaskFeedbackDrawerModal,
    setEditTask,
   
    userDetails: { employeeId },
  } = props;

  if (fetchingTaskListRangeByUserId) 
  {
   return <BundleLoader/>
  }


  return (
    <>
      {page < props.noOfPages ?
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
            <FloatButton.Group style={{width:"8rem",height:"5rem"}} >
            <Button
              style={{
                color: "#1f92e2",
                fontWeight: "600",
                fontSize: "15px",
                padding: "4px 12px",
                boxShadow: "0px 0px 5px 2px #d2e2ed",
                borderRadius: "22px"
              }}
              onClick={() => handleLoadMore()}
            >Load More</Button>
            </FloatButton.Group>
          </div> : null}
          <OnlyWrapCard style={{height:"81vh"}}>
      {taskListRangeByUserId.map((item) => { 
        const currentDate = moment();
        const completionDate = moment(item.completionDate);
        const endDate = moment(item.endDate);
        const difference = currentDate.diff(endDate, 'days');
        const incompleteDeviationDate = endDate.diff(currentDate, 'days');
        const completeDeviation = endDate.diff(completionDate, 'days');
         console.log("difference",difference)
         console.log("deviationDate",incompleteDeviationDate)
                    return (
                        <div>
                            <div className="flex justify-between mt-1 max-sm:flex-col"
                                style={{
                                    borderBottom: "3px dotted #515050"
                                }}>
                                     <div class="flex">
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row justify-between w-full ">
<div className="flex max-sm:w-full"> 
{item.priority === "High" && (
                      <div
                        style={{
                          borderRadius: "50%",
                          height: "2.1875em",
                          width: "2.1875em",
                          backgroundColor: "red",
                        }}
                      ></div>
                    )}
                    {item.priority === "Medium" && (
                      <div
                        style={{
                          borderRadius: "50%",
                          height: "2.1875em",
                          width: "2.1875em",
                          backgroundColor: "orange",
                        }}
                      ></div>
                    )}
                    {item.priority === "Low" && (
                      <div
                        style={{
                          borderRadius: "50%",
                          height: "2.1875em",
                          width: "2.1875em",
                          backgroundColor: "teal",
                        }}
                      ></div>
                    )}
                    <div class=" w-1"></div>
          <div class=" w-[10rem] max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex max-sm:justify-between flex-row w-full md:flex-col">
                                            <div class="text-sm text-cardBody font-poppins max-sm:hidden">
                                            Type
                                            </div>
                                            <div class="text-xs text-cardBody font-poppins cursor-pointer">                                       
                                            {item.taskType}
       
                                            </div>
                                         </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex font-medium flex-col  md:w-32 max-sm:flex-row w-full ">
                                    <div class=" text-sm text-cardBody font-sm font-poppins max-sm:hidden"> Name </div>
                                    <div class=" text-xs text-cardBody font-semibold  font-poppins">   
                                    <span   
                onClick={() => {
                  props.handleTaskopenModal(true);               
                  handleSetCurrentProcessName(item)
                  // this.props.setCurrentOpportunityRecruitMentData(item);
                }}
                style={{
                  cursor: "pointer",
                  color: "#042E8A",
                }}          
               >

                 {`${item.taskName} `} &nbsp;


               </span>
                                    </div>
                                </div>
                                </div>
                                <div className="flex font-medium flex-col md:w-24 max-sm:flex-row  w-full ">
                       
                       <div class="text-sm text-cardBody font-poppins max-sm:hidden">End</div>
                       <div class="text-xs text-cardBody font-poppins"> 
                        {`${moment(item.endDate).format("ll")}`}</div>
                   </div>
                                <div class="flex flex-col w-20">
                                  {/* <StyledLabel>today-enddate</StyledLabel> */}
                    <div class="">
                   
                    <ButtonGroup >
          {/* {item.complitionStatus === "To Start" && ( */}
          <StatusIcon
  type="To Start"
  iconType="fa-hourglass-start"
  tooltip="To Start"
  status={item.taskStatus}
  difference={difference} 
  onClick={() =>
    linkTaskStatus(item.taskId, {
      taskStatus: "To Start",
    })
  }
/>
          {/* )} */}


          {/* {item.complitionStatus === "In Progress" && ( */}
            <StatusIcon
              type="In Progress"
              iconType="fa-hourglass-half"
              tooltip="In Progress"
              status={item.taskStatus}
              difference={difference}
              onClick={() =>
                linkTaskStatus(item.taskId, {
                  //  ...item,
                   taskStatus: "In Progress",
                })
              }
            />
          {/* )} */}
          {/* {item.complitionStatus === "completed" && ( */}
            <StatusIcon
              type="Completed"
              iconType="fa-hourglass"
              tooltip="Completed"
              status={item.taskStatus}
              difference={difference}
              onClick={() =>
                linkTaskStatus(item.taskId, {
                  //  ...item,
                   taskStatus: "Completed",
                })
              }
            />
          {/* )} */}
        </ButtonGroup>
        <div></div>
                        </div>
                        {/* <div>
                       
                        {item.complitionStatus === "completed" && (
              <TaskStatusToggle
                completionInd={item.completionInd}
                taskId={item.taskId}
              />
            )}
                    </div> */}
                    </div>
                    <div className="flex font-medium flex-col md:w-24 max-sm:flex-row  w-full ">
                       
                       <div class="text-sm text-cardBody font-poppins max-sm:hidden">Deviation</div>
                       <div class="text-xs text-cardBody font-poppins"> 
                       {item.taskStatus === "Completed" ? `${completeDeviation} Days` : `${incompleteDeviationDate} Days`}
                   </div>
                     
                   </div>
                    <div className=" flex font-medium flex-col md:w-24 max-sm:flex-row justify-between w-full ">
                                  <div class="text-sm text-cardBody font-poppins max-sm:hidden">Assigned To</div>
                                  <div class="text-xs text-cardBody font-poppins mb-2">
                                  {item.assignedToName === null ? (
              ""
            ) : (
              <MultiAvatar
                primaryTitle={item.assignedToName}
                imgWidth={"1.8em"}
                imgHeight={"1.8em"}
              />
            )}
                                  </div>
                              </div>
                        
                    <div class="flex max-sm:mt-4 w-28">
                                <div className=" flex font-medium flex-col  md:w-24 max-sm:flex-row justify-between w-full ">
                                    <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Owner</div>
                                    <div class="text-xs text-cardBody font-poppins mb-2">
                                    <MultiAvatar
                                    // style={{marginBottom:"0.25rem"}}
                  primaryTitle={item.submittedBy}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                                    </div>
                                </div>
                               
                               
                                {/* <div className=" flex font-medium flex-col w-32 ">
                                    <div class=" text-sm text-cardBody font-poppins">Team</div>

                                    <div class=" text-sm text-cardBody font-poppins">
                                    <Avatar.Group
  maxCount={2}
  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
>
  {item.owner &&
    item.owner.map((candidate, i) => {
      if (candidate && candidate.fullName) {
        const data1 = candidate.fullName.slice(0, 2);
        console.log("datas", data1);
        return (
          <Tooltip title={candidate.fullName} key={i}>
            <Avatar style={{ backgroundColor: "#94b3e4" }}>
              {data1}
            </Avatar>
          </Tooltip>
        );
      } else {
        return null; 
      }
    })}
</Avatar.Group>
                                    </div>
                                </div> */}
                                {/* <div className="flex font-medium flex-col md:w-32 max-sm:flex-row justify-between w-full ">
                                    <div class="text-sm text-cardBody font-poppins">Start</div>

                                    <div class="text-sm text-cardBody font-poppins">
                                     {`${moment(item.startDate).format("ll")}`}
                                    </div>
                                </div> */}
                       


                   <div className="flex font-medium flex-col md:w-20 max-sm:flex-row  w-full justify-center ">
             {item.assignedToName !== item.submittedBy ? 
             <span>
             <Tooltip overlayStyle={{ maxWidth: "400px" }} title={`Review :${item.feedbackReview}`}>
            {item.feedbackRating === 0 ? (<StarBorderIcon
              style={{ color: "#eeeedd", fontSize: "1.5em" }} />)
              : (
                <span>
                  {item.feedbackRating}{<StarBorderIcon
                    style={{ color: "#FFD700", fontSize: "1.5em" }} />}
                </span>)}
             
                </Tooltip>
                </span>
              
                :null}

     
     </div> 
     <div className="flex font-medium flex-col md:w-20 max-sm:flex-row  w-full  justify-center ">
             {item.assignedToName !== item.submittedBy ? 
                         <Tooltip title="Feedback">
                         <FeedbackIcon
                                  onClick={() => {
                                    handleTaskFeedbackDrawerModal(true);
                                    handleSetTaskNameId(item);
                                  }}
                                  style={{  cursor: "pointer", fontSize: "1rem" }}
                                />
                             </Tooltip>
              
                :null}

     
     </div> 
  
                   </div>
                   <div class="flex w-44 ">
                   <div class="flex flex-col md:w-40 justify-center  max-sm:flex-row w-full">
                    <div class=" w-36">
  {item.taskStatus === "Completed" && !item.approvedInd && item.assignedToName !== item.submittedBy ? (
    <>
      <div>
        <Button
        onClick={() => approveTaskByTaskId(item.taskId, props.employeeId)}
          style={{ backgroundColor: "teal", color: "white" }}
        >
          <FormattedMessage id="app.approve" defaultMessage="Approve" />
        </Button>
        <Button
          style={{
            backgroundColor: "rgb(233, 79, 79)",
            color: "white",
          }}
          onClick={() => rejectTaskByTaskId(item.taskId)}
        >
          <FormattedMessage id="app.reject" defaultMessage="Reject" />
        </Button>
      </div>
    </>
  ) : (
    <>
      {item.approvedInd === "Approved" ? (
        <CheckCircleOutlined
          type="check-circle"
          theme="twoTone"
          twoToneColor="#52c41a"
          size={140}
          style={{ fontSize: "1rem" }}
        />
      ) : item.approvedInd === "Rejected" ? (
        <CloseCircleOutlined
          type="close-circle"
          theme="twoTone"
          twoToneColor="red"
          size={140}
          style={{ fontSize: "1rem" }}
        />
      ) : (
        <></>
      )}
    </>
  )}
  </div>
</div>

                          
                    <div class=" ml-2"></div>
                    <div class="flex flex-col justify-evenly  ">
                    <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  handleTaskNotesDrawerModal(true);
                  handleSetTaskNameId(item);
                }}
                style={{ color: "green", cursor: "pointer", fontSize: "1rem" }}
              />
           </Tooltip>
  
   <Tooltip title="Document">
          {/* {props.userId === item.userId && ( */}
                      <DownloadForOfflineIcon
                        // type="edit"
                        style={{ cursor: "pointer", fontSize: "1rem" }}
                        onClick={() => {
                          handleSetCurrentProcessName(item)
                          handleDownloadTaskModal(true);
                        }}
                      />
                    {/* )} */}
            </Tooltip>
            </div>
                    <div class="flex flex-col justify-evenly ">
   
   
          <Tooltip title="Edit">
          {props.userId === item.userId && (
                      <BorderColorIcon
                        type="edit"
                        style={{ cursor: "pointer", fontSize: "1rem" }}
                        onClick={() => {
                          props.setEditTask(item);
                          handleUpdateTaskModal(true);
                        }}
                      />
                    )}
            </Tooltip>
          
            <div>
           
            {item.complitionStatus !== "completed" && (
                          <StyledPopconfirm
                            // title="Do you want to delete?"
                            title={
                              <FormattedMessage
                                id="app.doyouwishtodelete?"
                                defaultMessage="Do you wish to delete?"
                              />
                            }
                            onConfirm={() => deleteTask(item.taskId, employeeId)}
                          >
                            <DeleteIcon
                              type="delete"
                              style={{ cursor: "pointer",color:"red", fontSize: "1rem" }}
                            />
                          </StyledPopconfirm>
                        )}
      
            </div>
                      </div>   
                      </div> 

                            </div>
                        </div>


                    )
                })}
      </OnlyWrapCard>

<UpdateTaskModal
          updateTaskModal={updateTaskModal}
          handleUpdateTaskModal={handleUpdateTaskModal}
        />
        <DownloadTaskModal
          item={currentprocessName}
          downloadTaskModal={downloadTaskModal}
          handleDownloadTaskModal={handleDownloadTaskModal}
        />
        
        <OpenTaskModal
          addTaskDetailModal={props.addTaskDetailModal}
          handleTaskopenModal={props.handleTaskopenModal}
          item={currentprocessName}
        />

        <AddTaskProjectDrawerModal
          handleTaskProjectDrawerModal={props.handleTaskProjectDrawerModal}
          addDrawerTaskProjectModal={props.addDrawerTaskProjectModal}
          data={data}
        />
<AddTaskNotesDrawerModal
handleSetTaskNameId={handleSetTaskNameId}
  handleTaskNotesDrawerModal={props.handleTaskNotesDrawerModal}
  addDrawerTaskNotesModal={props.addDrawerTaskNotesModal}
  currentNameId={currentNameId}
  // taskName={currentprocessName.taskName} // Pass taskName as a prop

/>

<AddTaskFeedbackDrawerModal
handleSetTaskNameId={handleSetTaskNameId}
handleTaskFeedbackDrawerModal={props.handleTaskFeedbackDrawerModal}
addDrawerTaskFeedbackModal={props.addDrawerTaskFeedbackModal}
  currentNameId={currentNameId}
  // taskName={currentprocessName.taskName} // Pass taskName as a prop

/>


      {/* AddTaskProjectDrawerModal and AddTaskNotesDrawerModal components go here */}
    </>
  );
};
  const mapStateToProps = ({ auth, task, opportunity }) => ({
    userDetails: auth.userDetails,
    addTaskDetailModal:task.addTaskDetailModal,
    addDrawerTaskNotesModal: task.addDrawerTaskNotesModal,
    addDrawerTaskFeedbackModal:task.addDrawerTaskFeedbackModal,
    userId: auth.userDetails.userId,
    employeeId: auth.userDetails.employeeId,
    addDrawerTaskProjectModal: task.addDrawerTaskProjectModal,
    updateTaskModal: task.updateTaskModal,
    downloadTaskModal:task.downloadTaskModal,
    noOfPages: task.taskListRangeByUserId.length && task.taskListRangeByUserId[0].noOfPages || "",
      fetchingTaskListRangeByUserId: task.fetchingTaskListRangeByUserId,
  fetchingTaskListRangeByUserIdError:task.fetchingTaskListRangeByUserIdError,
  taskListRangeByUserId: task.taskListRangeByUserId,

  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getTaskListRangeByUserId,
        handleTaskProjectDrawerModal,
        deleteTask,
        linkTaskStatus,
        handleTaskFeedbackDrawerModal,
        handleTaskNotesDrawerModal,
        approveTaskByTaskId,
        rejectTaskByTaskId,
        setEditTask,
        handleUpdateTaskModal,
        handleDownloadTaskModal,
        handleTaskopenModal
      },
      dispatch
    );
    export default connect(mapStateToProps, mapDispatchToProps)(TaskCardList);
   
    // function StatusIcon(props) {
    //   const { type, iconType, tooltip, status, onClick, difference } = props; // Receive the difference prop
    //   const start = type;
    //   let size;
    
    //   if (status === type) {
    //     size = "1.875em";
    //   } else {
    //     size = "1em";
    //   }
    
    //   return (
    //     <Tooltip title={`${tooltip} (${difference} days)`}> {/* Use difference prop in the tooltip */}
    //       <Button
    //         ghost={status !== type}
    //         style={{
    //           padding: "0.375em",
    //           borderColor: "transparent",
    //           color: status === type ? "rgb(251, 133, 0)" : "grey",
    //         }}
    //         onClick={onClick}
    //       >
    //         <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
    //       </Button>
    //     </Tooltip>
    //   );
    // }
    function StatusIcon(props) {
      const { type, iconType, tooltip, status, onClick, difference } = props;
    
      let iconColor = status === type ? "rgb(251, 133, 0)" : "grey";
      let size = status === type ? "1.875em" : "1em";
    
      // Display the difference as a label next to the icon
      const daysLabel = difference > 0 ? `+${difference} days` : `${difference} days`;
    
      return (
        <Tooltip title={`${tooltip} (${daysLabel})`}>
          <Button
            ghost={status !== type}
            style={{
              padding: "0.375em",
              borderColor: "transparent",
              color: iconColor,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={onClick}
          >
            <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }} />

            {status === type && <span style={{ fontSize: "0.82rem",display:"flex" }}>{daysLabel}</span>}
         
          </Button>
        </Tooltip>
      );
    }
    
    
      function overdue(pendingDays) {
        //debugger;
        if (pendingDays === -1) {
          //debugger;
          return <span style={{ color: "red", fontStyle: "italic" }}>1 Day</span>;
        }
        if (pendingDays < 0) {
          //debugger;
          return (
            <span style={{ color: "red", fontStyle: "italic" }}>{`${Math.abs(
              pendingDays
            )} Days`}</span>
          );
        }
        if (pendingDays === 1) {
          //debugger;
          return (
            <span
              style={{ color: "#21ce21", fontStyle: "italic" }}
            >{`${pendingDays} Day`}</span>
          );
        }
        if (pendingDays > 0) {
          //debugger;
          return (
            <span
              style={{ color: "#21ce21", fontStyle: "italic" }}
            >{`${pendingDays} Days`}</span>
          );
        }
      }
      
      const AppIcon = (props) => (
        <i
          className={`fas fa-heartbeat ${props.className}`}
          style={{ fontSize: "123%" }}
        ></i>
      );
      const PulseIcon = styled(AppIcon)`
        color: #df9697;
        &:hover {
          // background: yellow;
          color: blue;
        }
      `;