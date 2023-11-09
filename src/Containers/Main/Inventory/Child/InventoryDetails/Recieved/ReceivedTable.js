import React, { Component, Suspense, lazy, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import { Spacer } from "../../../../../../Components/UI/Elements";
import { Input, Tooltip, Space, Button, Badge } from "antd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {
  getReceivedUserList,
  handleReceivedModal,
  handleDeliveryDateModal,
  setEditReceiveInventory,
  handleReceivedOrderIdModal,
  updateInspection,
  handleInventoryReceivedNoteOrderModal
} from "../../../InventoryAction";
// import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Highlighter from "react-highlight-words";
import { SearchOutlined, CheckCircleOutlined } from "@ant-design/icons";
import DeliveryDateModal from "./DeliveryDateModal";
import { withRouter } from "react-router";
import OpenReceivedOrderIdModal from "./OpenReceivedOrderIdModal";
// import InventoryNoteReceivedOrderModal from "./InventoryNoteReceivedOrderModal";

const ReceivedTable = (props) => {

  // function getColumnSearchProps(dataIndex) {
  //   return {
  //     filterDropdown: ({
  //       setSelectedKeys,
  //       selectedKeys,
  //       confirm,
  //       clearFilters,
  //     }) => (
  //       <div style={{ padding: 8 }}>
  //         <Input
  //           // ref={node => {
  //           //   searchInput = node;
  //           // }}
  //           placeholder={`Search ${dataIndex}`}
  //           value={selectedKeys[0]}
  //           onChange={(e) =>
  //             setSelectedKeys(e.target.value ? [e.target.value] : [])
  //           }
  //           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //           style={{ width: 240, marginBottom: 8, display: "block" }}
  //         />
  //         <Space>
  //           <Button
  //             type="primary"
  //             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //             icon={<SearchOutlined />}
  //             size="small"
  //             style={{ width: 90 }}
  //           >
  //             Search
  //           </Button>
  //           <Button
  //             onClick={() => handleReset(clearFilters)}
  //             size="small"
  //             style={{ width: 90 }}
  //           >
  //             Reset
  //           </Button>
  //           <Button
  //             type="link"
  //             size="small"
  //             onClick={() => {
  //               confirm({ closeDropdown: false });
  //               setSearchText(selectedKeys[0]);
  //               setSearchedColumn(dataIndex);
  //             }}
  //           >
  //             Filter
  //           </Button>
  //         </Space>
  //       </div>
  //     ),
  //     filterIcon: (filtered) => (
  //       <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  //     ),
  //     onFilter: (value, record) =>
  //       record[dataIndex]
  //         ? record[dataIndex]
  //           .toString()
  //           .toLowerCase()
  //           .includes(value.toLowerCase()) : "",
  //     onFilterDropdownVisibleChange: (visible) => {
  //       if (visible) {
  //         // setTimeout(() => searchInput.select());
  //       }
  //     },
  //     render: (text) =>
  //       searchedColumn === dataIndex ? (
  //         <Highlighter
  //           highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
  //           searchWords={[searchText]}
  //           autoEscape
  //           textToHighlight={text ? text.toString() : ""}
  //         />
  //       ) : (
  //         text
  //       ),
  //   };
  // }

  // function handleSearch(selectedKeys, confirm, dataIndex) {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // }

  // function handleReset(clearFilters) {
  //   clearFilters();
  //   setSearchText("");
  // }

  useEffect(() => {
    props.getReceivedUserList(props.locationDetailsId)
  }, [])

  const [rowData, setRowData] = useState({})
  const handleRowData = (item) => {
    setRowData(item)
  }
  const [pause, setpause] = useState(false)

  function handlePauseResume() {
    setpause(!pause)
  }
  const columns = [
    {
      title: "",
      width: "2%",
    },

    {
      title: "Order #",
      dataIndex: "newOrderNo",
      width: "15%",
      render: (name, item, i) => {
        const currentdate = moment().format("DD/MM/YYYY");
        const date = moment(item.createAt).format("DD/MM/YYYY");
        return (
          <>
            <span
              style={{ textDecoration: "underline", cursor: "pointer", color: "#1890ff" }}
              onClick={() => {
                handleRowData(item);
                props.handleReceivedOrderIdModal(true);
              }}
            >{item.newOrderNo}</span>
            &nbsp;&nbsp;
            {date === currentdate ? (
              <span
                style={{
                  color: "tomato",
                  fontWeight: "bold",
                }}
              >
                New
              </span>
            ) : null}
          </>
        );
      },
    },
    {
      title: "AWB",
      width: "8%",
      dataIndex: 'awbNo',
    },

    {
      title: "Customer",
      width: "10%",
      dataIndex: "distributorName"
    },
    {
      title: "Contact",
      width: "10%",
      dataIndex: "contactPersonName"
    },
    {
      title: "Inspected By",
      width: "10%",
      dataIndex: "startInspectionUserName"
    },
    {
      title: "Phones #",
      width: "10%",
      dataIndex: "phoneCount",
      render: (text, item) => {
        return (
          <>{item.phoneReceiveCount}/{item.phoneCount}</>
        )
      }

    },

    {
      title: "Pick Up",
      width: "10%",
      render: (text, item) => {
        return (
          <>{item.orderDetailsViewDTO && item.orderDetailsViewDTO.name || ""}</>
        )
      }
    },
    {
      title: "",
      width: "3%",
      render: (name, item, i) => {
        //debugger
        return (
          <Tooltip title="Notes">
            <NoteAltIcon 
              style={{ cursor: "pointer", fontSize: "13px" }}
              onClick={() => {
                handleRowData(item);
                props.handleInventoryReceivedNoteOrderModal(true);
              }}
            />

          </Tooltip>
        );
      },
    },

    {
      title: "",
      width: "10%",
      render: (name, item, i) => {
        //debugger
        return (
          <>
            {item.inspectionInd === 0 ?
              <Button
                onClick={() => props.updateInspection({
                  inspectionInd: 1,
                  startInspectionUser: props.userId,
                  startInspectionDate: moment()
                }, item.orderPhoneId, props.locationDetailsId)}
                style={{ backgroundColor: "#33ad33", color: "white", fontWeight: "500" }}>
                Start Inspection
              </Button>
              : item.inspectionInd === 2 ?
                <Button
                  style={{ cursor: "pointer", fontSize: "13px", backgroundColor: "#3096e9", color: "white", fontWeight: "500" }}
                  onClick={() => {
                    handleRowData(item)
                    props.handleDeliveryDateModal(true);
                  }}
                >
                  Send To Store
                </Button> :
                item.inspectionInd === 1 ?
                  <Button
                    style={{ fontWeight: "500", color: "white" }}
                    onClick={handlePauseResume}
                    type="primary">
                    {pause ? "Resume Inspection" : "Pause Inspection"}
                  </Button> : <b>Store locator</b>}
          </>
        );
      },
    },
  ];


  return (
    <>
      <StyledTable
        rowKey=""
        columns={columns}
        dataSource={props.allReceivedUser}
        loading={
          props.fetchingReceivedUserList
        }
        pagination={false}
        scroll={{ y: 160 }}

      />

      <DeliveryDateModal
        rowData={rowData}
        addDeliverDate={props.addDeliverDate}
        handleDeliveryDateModal={props.handleDeliveryDateModal}
      />

      <OpenReceivedOrderIdModal
        locationDetailsId={props.locationDetailsId}
        rowData={rowData}
        receivedOrdeIdModal={props.receivedOrdeIdModal}
        handleReceivedOrderIdModal={props.handleReceivedOrderIdModal}
      />
      {/* 
      <InventoryNoteReceivedOrderModal
        rowData={rowData}
        invenReceivedNoteOrderModal={props.invenReceivedNoteOrderModal}
        handleInventoryReceivedNoteOrderModal={props.handleInventoryReceivedNoteOrderModal}

      /> */}
      <Spacer />
    </>
  );
}


const mapStateToProps = ({ inventory, auth }) => ({
  fetchingReceivedUserList: inventory.fetchingReceivedUserList,
  allReceivedUser: inventory.allReceivedUser,
  locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
  addDeliverDate: inventory.addDeliverDate,
  receivedOrdeIdModal: inventory.receivedOrdeIdModal,
  receivedOrdeIdModal: inventory.receivedOrdeIdModal,
  invenReceivedNoteOrderModal: inventory.invenReceivedNoteOrderModal,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setEditReceiveInventory,
      getReceivedUserList,
      handleReceivedModal,
      handleDeliveryDateModal,
      handleReceivedOrderIdModal,
      handleInventoryReceivedNoteOrderModal,
      updateInspection
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReceivedTable)
);
