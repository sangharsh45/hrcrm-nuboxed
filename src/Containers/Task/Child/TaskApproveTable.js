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
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { OnlyWrapCard } from '../../../Components/UI/Layout';
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import AddTaskProjectDrawerModal from "../Child/AddTaskProjectDrawerModal";
import { Tooltip, Input, Button, Avatar,FloatButton } from "antd";
import moment from "moment";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledPopconfirm, StyledTable } from "../../../Components/UI/Antd";
import { withRouter } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getAprrovalTaskTable,
  deleteTask,
  approveTaskByTaskId,
  rejectTaskByTaskId,
  handleUpdateTaskModal,
  setEditTask,
  handleTaskNotesDrawerModal,
  handleTaskProjectDrawerModal,
} from "../TaskAction";
import Highlighter from "react-highlight-words";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { MultiAvatar } from "../../../Components/UI/Elements";
import BorderColorIcon from "@mui/icons-material/BorderColor";
const AddTaskNotesDrawerModal = lazy(() => import("./AddTaskNotesDrawerModal"));
const UpdateTaskModal = lazy(() => import("./UpdateTaskModal"));
const ButtonGroup = Button.Group;

const TaskApproveTable = (props) => {
  const [data, setData] = useState("");
  const [data1, setData1] = useState("");
  const [currentNameId, setCurrentNameId] = useState("");
  const tab = document.querySelector('.ant-layout-sider-children');
  const tableHeight = tab && tab.offsetHeight * 0.75;
  const [currentprocessName, setCurrentprocessName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(page + 1);
    props.getAprrovalTaskTable(props.employeeId,page);
    // props.getProviderCustomerData(props.provider.serviceId, page);
  }, []);
  const handleLoadMore = () => {
    setTimeout(() => {
      setPage(page + 1);
      props.getAprrovalTaskTable(props.employeeId,page);
      // props.getProviderCustomerData(props.provider.serviceId, page);
    }, 100);
  };
  function handleSetTaskNameId(item) {
    setCurrentNameId(item);
  }
  function handleSetCurrentProcessName(item) {
    setCurrentprocessName(item);
     console.log(item);
   }
  

  const handleIconClick = (data) => {
    setData(data);
  };

  const handleNotesClick = (data1) => {
    setData1(data1);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />

        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({ closeDropdown: false });
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
          }}
        >
          Filter
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        type="search"
        style={{ color: filtered ? "#1890ff" : undefined }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const {
    fetchingApproveTaskTable,
    fetchingApproveTaskTableError,
    approvalTaskTable,
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
          <OnlyWrapCard style={{height:"81vh",backgroundColor:"#E3E8EE"}}>
          <div className=" flex justify-between w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[14rem]"><FormattedMessage
                          id="app.type"
                          defaultMessage="type"
                        /></div>
        <div className=" md:w-44"><FormattedMessage
                          id="app.name"
                          defaultMessage="name"
                        /></div>
             <div className=" md:w-28 "><FormattedMessage
                          id="app.submittedby"
                          defaultMessage="submittedby"
                        /></div>
        <div className="md:w-16"><FormattedMessage
                          id="app.deviation"
                          defaultMessage="deviation"
                        /></div>
        <div className="md:w-28"><FormattedMessage
                          id="app.assignedto"
                          defaultMessage="assignedto"
                        /></div>
        <div className="md:w-28"></div>
        <div className="md:w-[3%]"></div>
        <div className="md:w-[5%]"></div>
</div>
          {approvalTaskTable.map((item) => { 
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
                            <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3"
                                style={{
                                 
                                }}>
                                     <div class="flex">
                                <div className=" flex font-medium flex-col md:w-[12.1rem] max-sm:flex-row justify-between w-full ">
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
          <div class=" w-[7.1rem] max-sm:w-full">
                                        <Tooltip>
                                        <div class=" flex max-sm:justify-between flex-row w-full md:flex-col">
                                            {/* <div class="text-sm text-cardBody font-poppins max-sm:hidden">
                                            Type
                                            </div> */}
                                            <div class="text-xs text-cardBody font-poppins cursor-pointer">                                       
                                            {item.taskType}
       
                                            </div>
                                         </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>

                                <div className=" flex font-medium flex-col  md:w-[10.3rem] max-sm:flex-row w-full ">
                                    {/* <div class=" text-sm text-cardBody  font-poppins max-sm:hidden"> Name </div> */}
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
               
                   
                        
                    <div class="flex max-sm:mt-4 w-28">
                                <div className=" flex font-medium flex-col  md:w-24 max-sm:flex-row justify-between w-full ">
                                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Submitted By</div> */}
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
                     
                       


        
     
  
                   </div>
                   <div class="flex max-sm:mt-4 w-28">
                                <div className=" flex font-medium flex-col  md:w-24 max-sm:flex-row w-full ">
                                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Assigned On</div> */}
                                    <div class="text-xs text-cardBody font-poppins mb-2">
                                    <span>{` ${moment(item.assignedOn).format("ll")}`}</span>
                                    </div>
                                </div>
                               
                         
                       


        
     
  
                   </div>
                   <div class="flex w-44 ">
                   <div class="flex flex-col md:w-40 justify-center  max-sm:flex-row w-full">
                    <div class=" w-36">
                    {item.filterTaskInd === true && item.approvedInd === "Pending"  ? (
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
       {  item.filterTaskInd === true && item.approvedInd === "Approved" ? (
        <CheckCircleOutlined
          type="check-circle"
          theme="twoTone"
          twoToneColor="#52c41a"
          size={140}
          style={{ fontSize: "1rem" }}
        />
        ) : item.filterTaskInd === true && item.approvedInd === "Rejected" ? (
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
    addDrawerTaskNotesModal: task.addDrawerTaskNotesModal,
    userId: auth.userDetails.userId,
    approvalTaskTable:task.approvalTaskTable,
    employeeId: auth.userDetails.employeeId,
    addDrawerTaskProjectModal: task.addDrawerTaskProjectModal,
    updateTaskModal: task.updateTaskModal,
    noOfPages: task.approvalTaskTable.length && task.approvalTaskTable[0].noOfPages || "",
    fetchingApproveTaskTable: task.fetchingApproveTaskTable,
    fetchingApproveTaskTableError: task.fetchingApproveTaskTableError,

  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getAprrovalTaskTable,
        handleTaskProjectDrawerModal,
        deleteTask,
        handleTaskNotesDrawerModal,
        approveTaskByTaskId,
        rejectTaskByTaskId,
        setEditTask,
        handleUpdateTaskModal,
      },
      dispatch
    );
    export default connect(mapStateToProps, mapDispatchToProps)(TaskApproveTable);
   
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


    //   {approvalTaskTable.map((item) => { 
        
    //     console.log("item",item.taskId)
    //                return (
    //                    <div>
    //                        <div className="flex justify-between mt-4 max-sm:flex-col"
    //                            style={{
    //                                borderBottom: "3px dotted #515050"
    //                            }}>
    //                                 <div class="flex">
    //                            <div className=" flex font-medium flex-col md:w-52 max-sm:flex-row w-full justify-between  ">
    // <div className="flex max-sm:w-full"> 
    // {item.priority === "High" && (
    //                  <div
    //                    style={{
    //                      borderRadius: "50%",
    //                      height: "2.1875em",
    //                      width: "2.1875em",
    //                      backgroundColor: "red",
    //                    }}
    //                  ></div>
    //                )}
    //                {item.priority === "Medium" && (
    //                  <div
    //                    style={{
    //                      borderRadius: "50%",
    //                      height: "2.1875em",
    //                      width: "2.1875em",
    //                      backgroundColor: "orange",
    //                    }}
    //                  ></div>
    //                )}
    //                {item.priority === "Low" && (
    //                  <div
    //                    style={{
    //                      borderRadius: "50%",
    //                      height: "2.1875em",
    //                      width: "2.1875em",
    //                      backgroundColor: "teal",
    //                    }}
    //                  ></div>
    //                )}
    //                <div class=" w-1"></div>
    //      <div class="max-sm:w-full">
    //                                    <Tooltip>
    //                                    <div class=" flex max-sm:justify-between flex-row w-full md:flex-col">
    //                                        <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">
    //                                        Type
    //                                        </div>
    //                                        <div class="text-[sm] text-cardBody font-poppins cursor-pointer">                                       
    //                                        {item.taskType}
      
    //                                        </div>
    //                                    </div>
    //                                    </Tooltip>
    //                                    </div>
    //                                    </div>
    //                            </div>
    
    //                            <div className=" flex font-medium flex-col  md:w-36 max-sm:flex-row w-full justify-between ">
    //                                <div class=" text-[0.875rem] text-cardBody font-[0.875rem] font-poppins max-sm:hidden"> Name </div>
    //                                <div class=" text-[sm] text-cardBody font-poppins">   
    //                                <span   
    //            onClick={() => {
    //              // props.handleTaskopenModal(true);               
    //              handleSetCurrentProcessName(item)
    //              // this.props.setCurrentOpportunityRecruitMentData(item);
    //            }}
    //            style={{
    //              cursor: "pointer",
    //              color: "#042E8A",
    //            }}          
    //           >
    
    //             {`${item.taskName} `} &nbsp;
    
    
    //           </span>
    //                                </div>
    //                            </div>
    //                            {/* <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
    //                                <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Customer</div>
    //                                <div class="text-[sm] text-cardBody font-poppins">
    //                                {item.customerName === null ? (
    //          ""
    //        ) : (
    //                                <MultiAvatar
    //              primaryTitle={item.customerName}
    //              imgWidth={"1.8rem"}
    //              imgHeight={"1.8rem"}
    //            />
    //            )}
    //                                </div>
    //                            </div> */}
    //                            </div>
    //                            <div class="flex">
    //                            <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
    //                                <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Submitted By</div>
    //                                <div class="text-[sm] text-cardBody font-poppins">
    //                                <MultiAvatar
    //              primaryTitle={item.submittedBy}
    //              imgWidth={"1.8rem"}
    //              imgHeight={"1.8rem"}
    //            />
    //                                </div>
    //                            </div>
    //                            {/* <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
    //                              <div class="text-[0.875rem] text-cardBody font-poppins">Assigned To</div>
    //                              <div class="text-[sm] text-cardBody font-poppins">
    //                              {item.assignedToName === null ? (
    //          ""
    //        ) : (
    //          <MultiAvatar
    //            primaryTitle={item.assignedToName}
    //            imgWidth={"1.8em"}
    //            imgHeight={"1.8em"}
    //          />
    //        )}
    //                              </div>
    //                          </div> */}
    //                          <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
    //                              <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Assigned On</div>
    //                              <div class="text-[sm] text-cardBody font-poppins">
    //                              <span>{` ${moment(item.assignedOn).format("ll")}`}</span>
    //                              </div>
    //                          </div>
    //                          </div>
    //                          <div class="flex">
    //                          <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full justify-between ">
                             
    //                              <div class="text-[sm] text-cardBody font-poppins">
    //                              <span>
    //        {item.filterTaskInd === true && item.approvedInd === "Pending"  ? (
    //          <>
    //            <div>
    //              <Button
    //                onClick={() => approveTaskByTaskId(item.taskId)}
    //                style={{ backgroundColor: "teal", color: "white" }}
    //              >
    //                {/* Approve */}
    //                <FormattedMessage
    //                  id="app.approve"
    //                  defaultMessage="Approve"
    //                />
    //              </Button>
    //              <Button
    //                style={{
    //                  backgroundColor: "rgb(233, 79, 79)",
    //                  color: "white",
    //                }}
    //                onClick={() => rejectTaskByTaskId(item.taskId)}
    //              >
    //                {/* Reject */}
    //                <FormattedMessage
    //                  id="app.reject"
    //                  defaultMessage="Reject"
    //                />
    //              </Button>
    //            </div>
    //          </>
    //        ) :  (
    //          <>
    //            {  item.filterTaskInd === true && item.approvedInd === "Approved" ? (
    //              <CheckCircleOutlined
    //                type="check-circle"
    //                theme="twoTone"
    //                twoToneColor="#52c41a"
    //                size={140}
    //                style={{ fontSize: "1rem" }}
    //              />
    //            ) : item.filterTaskInd === true && item.approvedInd === "Rejected" ? (
    //              <CloseCircleOutlined
    //                type="close-circle"
    //                theme="twoTone"
    //                twoToneColor="red"
    //                size={140}
    //                style={{ fontSize: "1rem" }}
    //              />
    //            ) : (
    //              <></>
    //            )}
    //          </>
    //        )}
    //      </span>
    //                              </div>
    //                          </div>
    
    
              
    //                <div class="flex flex-col w-[2%]">
    //   <div>
    //   <NoteAltIcon
    //            onClick={() => {
    //              handleTaskNotesDrawerModal(true);
    //              handleSetTaskNameId(item);
    //            }}
    //            style={{ color: "green", cursor: "pointer", fontSize: "0.8rem" }}
    //          />
    //   </div>
      
         
       
    //                  </div>    
    //                  </div>
    //                        </div>
    //                    </div>
    
    
    //                )
    //            })}