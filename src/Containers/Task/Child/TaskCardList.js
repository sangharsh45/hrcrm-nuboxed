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
  approveTaskByTaskId,
  rejectTaskByTaskId,
  handleUpdateTaskModal,
  setEditTask,
  handleTaskNotesDrawerModal,
  handleTaskProjectDrawerModal,
  handleTaskopenModal
} from "../TaskAction";
import { MultiAvatar } from "../../../Components/UI/Elements";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddTaskNotesDrawerModal from "./AddTaskNotesDrawerModal";
import OpenTaskModal from "./OpenTaskModal";
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
    approveTaskByTaskId,
    rejectTaskByTaskId,
    handleUpdateTaskModal,
    handleTaskProjectDrawerModal,
    updateTaskModal,
    addDrawerTaskNotesModal,
    handleTaskNotesDrawerModal,
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
          <OnlyWrapCard>
      {taskListRangeByUserId.map((item) => { 
        
         
                    return (
                        <div>
                            <div className="flex justify-between mt-4"
                                style={{
                                    borderBottom: "3px dotted #515050"
                                }}>
                                     
                                <div className=" flex font-medium flex-col w-52 ">
<div className="flex"> 
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
          <div>
                                        <Tooltip>
                                            <div class="text-[0.875rem] text-cardBody font-poppins">
                                            Type
                                            </div>
                                            <div class="text-[0.75rem] text-cardBody font-poppins cursor-pointer">                                       
                                            {item.taskType}
       
                                            </div>

                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex font-medium flex-col  w-36 ">
                                    <div class=" text-[0.875rem] text-cardBody font-[0.875rem] font-poppins"> Name </div>
                                    <div class=" text-[0.75rem] text-cardBody font-poppins">   
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
                                <div className=" flex font-medium flex-col w-32 ">
                                    <div class=" text-[0.875rem] text-cardBody font-poppins">Owner</div>
                                    <div class="text-[0.75rem] text-cardBody font-poppins">
                                    <MultiAvatar
                  primaryTitle={item.submittedBy}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col w-32 ">
                                  <div class="text-[0.875rem] text-cardBody font-poppins">Assigned To</div>
                                  <div class="text-[0.75rem] text-cardBody font-poppins">
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
                                <div className=" flex font-medium flex-col w-32 ">
                                    <div class=" text-[0.875rem] text-cardBody font-poppins">Team</div>

                                    <div class=" text-[0.75rem] text-cardBody font-poppins">
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
                                </div>
                                <div className="flex font-medium flex-col w-32 ">
                                    <div class="text-[0.875rem] text-cardBody font-poppins">Start</div>

                                    <div class="text-[0.75rem] text-cardBody font-poppins">
                                     {`${moment(item.startDate).format("ll")}`}
                                    </div>
                                </div>
                                <div className="flex font-medium flex-col w-20 ">
                       
                       <div class="text-[0.875rem] text-cardBody font-poppins">End</div>
                       <div class="text-[0.75rem] text-cardBody font-poppins"> 
                        {`${moment(item.endDate).format("ll")}`}</div>
                   </div>
                   <div class="flex flex-col w-[10%]">
                   {item.taskStatus === "Completed" && !item.approvedInd ? (
              <>
                <div>
                  <Button
                    onClick={() => approveTaskByTaskId(item.taskId)}
                    style={{ backgroundColor: "teal", color: "white" }}
                  >
                    {/* Approve */}
                    <FormattedMessage
                      id="app.approve"
                      defaultMessage="Approve"
                    />
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "rgb(233, 79, 79)",
                      color: "white",
                    }}
                    onClick={() => rejectTaskByTaskId(item.taskId)}
                  >
                    {/* Reject */}
                    <FormattedMessage
                      id="app.reject"
                      defaultMessage="Reject"
                    />
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
                                <div class="flex flex-col w-[3%]">
                    <div class="">
                    <ButtonGroup>
          {item.complitionStatus === "To Start" && (
            <StatusIcon
              type="To Start"
              iconType="fa-hourglass-start"
              tooltip="To Start"
              color="blue"
            />
          )}
          {item.complitionStatus === "In Progress" && (
            <StatusIcon
              type="In Progress"
              iconType="fa-hourglass-half"
              tooltip="In Progress"
            />
          )}
          {item.complitionStatus === "completed" && (
            <StatusIcon
              type="Completed"
              iconType="fa-hourglass"
              tooltip="Completed"
            />
          )}
        </ButtonGroup>
                        </div>
                        <div>
                        {item.complitionStatus === "completed" && (
              <TaskStatusToggle
                completionInd={item.completionInd}
                taskId={item.taskId}
              />
            )}
                    </div>
                    </div>
                    <div class="flex flex-col w-[2%]">
       <div>
       <NoteAltIcon
                onClick={() => {
                  handleTaskNotesDrawerModal(true);
                  handleSetTaskNameId(item);
                }}
                style={{ color: "green", cursor: "pointer", fontSize: "0.8rem" }}
              />
       </div>
          <Tooltip title="Edit">
          {props.userId === item.userId && (
                      <BorderColorIcon
                        type="edit"
                        style={{ cursor: "pointer", fontSize: "0.8rem" }}
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
                              style={{ cursor: "pointer",color:"red", fontSize: "0.8rem" }}
                            />
                          </StyledPopconfirm>
                        )}
      
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


      {/* AddTaskProjectDrawerModal and AddTaskNotesDrawerModal components go here */}
    </>
  );
};
  const mapStateToProps = ({ auth, task, opportunity }) => ({
    userDetails: auth.userDetails,
    addTaskDetailModal:task.addTaskDetailModal,
    addDrawerTaskNotesModal: task.addDrawerTaskNotesModal,
    userId: auth.userDetails.userId,
    employeeId: auth.userDetails.employeeId,
    addDrawerTaskProjectModal: task.addDrawerTaskProjectModal,
    updateTaskModal: task.updateTaskModal,
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
        handleTaskNotesDrawerModal,
        approveTaskByTaskId,
        rejectTaskByTaskId,
        setEditTask,
        handleUpdateTaskModal,
        handleTaskopenModal
      },
      dispatch
    );
    export default connect(mapStateToProps, mapDispatchToProps)(TaskCardList);
   
    function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
        const start = type;
        console.log(start);
        //////debugger;
        if (status === type) {
          size = "1.875em";
        } else {
          size = "1em";
        }
        return (
          <Tooltip title={tooltip}>
            <Button
              ghost={status !== type}
              style={{
                padding: "0.375em",
                borderColor: "transparent",
                color: type === "Completed" ? "green" : "orange",
              }}
              onClick={onClick}
            >
              <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
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