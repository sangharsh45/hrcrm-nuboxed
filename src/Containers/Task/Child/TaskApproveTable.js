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
import AddTaskNotesDrawerModal from "./AddTaskNotesDrawerModal";
const UpdateTaskModal = lazy(() => import("./UpdateTaskModal"));
const ButtonGroup = Button.Group;

const TaskApproveTable = (props) => {
  const [data, setData] = useState("");
  const [data1, setData1] = useState("");
  const tab = document.querySelector('.ant-layout-sider-children');
  const tableHeight = tab && tab.offsetHeight * 0.75;

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

  const columns = [
    {
      title: "",
      width: "2%",
    },

    {
      title: "",
     
      width: "2%",
      dataIndex: "priority",
  
      defaultSortOrder: "ascend",
      // width: "20%",
      render: (name, item, i) => {     
        return (
                  <div>
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
                  </div>
                );
      },
    },
    {
      title: "Type",
     
      dataIndex: "taskType",
     
       width: "6%",
       render: (name, item, i) => { 
        return <span>{` ${item.taskType}`}</span>;
             
       }
    },

      {
        title: "Name",

    
   dataIndex: "taskName",
      width: "7%",
    },

    {
      title: "Customer",

    
      dataIndex: "customerName",
      width: 8,
      render: (name, item, i) => { 
        
        return (
          <span>
            {item.customerName === null ? (
              ""
            ) : (
            <Tooltip title={item.customerName}>
              <MultiAvatar
                primaryTitle={item.customerName}
                imgWidth={"1.8em"}
                imgHeight={"1.8em"}
              />
           
            </Tooltip>
               )}
          </span>
        );
      },
    },


        {
          title: "Owner",
          dataIndex: "submittedBy",
          width: 6,
         
          render: (name, item, i) => { 
            return (
              <span>
                <MultiAvatar
                  primaryTitle={item.submittedBy}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              </span>
            );
          },
        },

           {
            title: "Assigned on",
          // dataIndex: "submittedBy",
     
      width: 8,
      render: (name, item, i) => { 
       
        return <span>{` ${moment(item.assignedOn).format("ll")}`}</span>;
      },
    },

    {
      title: "Assigned To",
    // dataIndex: "submittedBy",

width: 8,
render: (name, item, i) => { 
 
  return (
            <span>
            {item.assignedToName === null ? (
              ""
            ) : (
              <MultiAvatar
                primaryTitle={item.assignedToName}
                imgWidth={"1.8em"}
                imgHeight={"1.8em"}
              />
            )}
            </span>
          );
},
},








      {
      title: "",
      
      dataIndex: "Completed",
      width: 10,
      render: (name, item, i) => { 
       
        return (
          <span>
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
          </span>
        );
      },
    },


    {
      title: "",
      // dataIndex: "submittedBy",
          width: 2,
          render: (name, item, i) => { 
           
            return (
              <NoteAltIcon
                onClick={() => {
                  handleTaskNotesDrawerModal(true);
                  this.handleNotesClick(item);
                }}
                style={{ color: "green", cursor: "pointer", fontSize: "0.8rem" }}
              />
            );
          },
        },


      



                        {
   
                          title: "",
                          // dataIndex: "submittedBy",
                              width: 2,
                              render: (name, item, i) => { 
        return (
          <>
            {item.complitionStatus === "completed" && (
              <TaskStatusToggle
                completionInd={item.completionInd}
                taskId={item.taskId}
              />
            )}
          </>
        );
      },
    },
              


   
                  
    
  ];

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
      <StyledTable
        columns={columns}
        dataSource={approvalTaskTable}
        pagination={false}
        loading={fetchingApproveTaskTable || fetchingApproveTaskTableError}
        scroll={{ y: tableHeight }}
      />

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
          handleTaskNotesDrawerModal={props.handleTaskNotesDrawerModal}
          addDrawerTaskNotesModal={props.addDrawerTaskNotesModal}
          data1={data1}
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