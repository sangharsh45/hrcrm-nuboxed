import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Spacer } from "../../../../../../Components/UI/Elements";
import { Tooltip, Button, } from "antd";
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
import moment from "moment";
import DeliveryDateModal from "./DeliveryDateModal";
import { withRouter } from "react-router";
import OpenReceivedOrderIdModal from "./OpenReceivedOrderIdModal";
import { OnlyWrapCard } from '../../../../../../Components/UI/Layout';
import { FormattedMessage } from "react-intl";

const ReceivedTable = (props) => {


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


  return (
    <>
      <div className=' flex justify-end sticky top-28 z-auto'>
        <OnlyWrapCard style={{ backgroundColor: "#E3E8EE" }}>
          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=""></div>
            <div className=" md:w-[7%]"><FormattedMessage id="app.order" defaultMessage="Order #" /></div>
            <div className=" md:w-[6.1rem]"><FormattedMessage id="app.awb" defaultMessage="AWB" /></div>
            <div className=" md:w-[4.2rem] "><FormattedMessage id="app.customer" defaultMessage="Customer" /></div>
            <div className="md:w-[5.8rem]"><FormattedMessage id="app.contact" defaultMessage="Contact" /></div>
            <div className="md:w-[8.5rem]"><FormattedMessage id="app.inspectedby" defaultMessage="Inspected By" /></div>
            <div className="md:w-[5.2rem]"><FormattedMessage id="app.phone" defaultMessage="Phones #" /></div>
            <div className="md:w-[5.2rem]"><FormattedMessage id="app.pickup" defaultMessage="Pick Up" /></div>
            <div className="md:w-[5.2remb]"></div>
            <div className="w-12"></div>
          </div>

          {props.allReceivedUser.map((item) => {
            const currentdate = moment().format("DD/MM/YYYY");
            const date = moment(item.createAt).format("DD/MM/YYYY");
            return (
              <div>
                <div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 ">
                  <div class="flex">

                    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
                      <h4 class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                        <span
                          onClick={() => {
                            handleRowData(item);
                            props.handleReceivedOrderIdModal(true);
                          }}
                        >{item.newOrderNo}</span>&nbsp;&nbsp;
                        {date === currentdate ? (
                          <span class="text-xs"
                            style={{
                              color: "tomato",
                              fontWeight: "bold",
                            }}
                          >
                            New
                          </span>
                        ) : null}
                      </h4>
                    </div>

                    <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                      <h4 class=" text-xs text-cardBody font-poppins">
                        {item.awbNo}
                      </h4>

                    </div>

                  </div>

                  <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <h4 class=" text-xs text-cardBody font-poppins">

                      {item.distributorName}
                    </h4>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.contactPersonName}
                    </h4>
                  </div>

                  <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.startInspectionUserName}
                    </h4>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.phoneReceiveCount}/{item.phoneCount}
                    </h4>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.orderDetailsViewDTO && item.orderDetailsViewDTO.name || ""}
                    </h4>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
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
                    </h4>
                  </div>
                  <div class="flex md:items-center">

                  </div>
                  <div class="flex flex-col w-[2%] max-sm:flex-row max-sm:w-[6%]">
                    <div>
                      <Tooltip title="Notes">
                        <NoteAltIcon
                          style={{ cursor: "pointer", fontSize: "13px" }}
                          onClick={() => {
                            handleRowData(item);
                            props.handleInventoryReceivedNoteOrderModal(true);
                          }}
                        />

                      </Tooltip>
                    </div>

                    {/* <div>
                   <Tooltip title={item.salesExecutiveEmail}>
               <span>
                 <i class="far fa-envelope"></i>
               </span>
             </Tooltip>
                        </div> */}
                  </div>

                </div>
              </div>
            );
          })}

        </OnlyWrapCard>
      </div>

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

// import React, { Component, Suspense, lazy, useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../../../../Components/UI/Antd";
// import { Spacer } from "../../../../../../Components/UI/Elements";
// import { Input, Tooltip, Space, Button, Badge } from "antd";
// import NoteAltIcon from "@mui/icons-material/NoteAlt";
// import {
//   getReceivedUserList,
//   handleReceivedModal,
//   handleDeliveryDateModal,
//   setEditReceiveInventory,
//   handleReceivedOrderIdModal,
//   updateInspection,
//   handleInventoryReceivedNoteOrderModal
// } from "../../../InventoryAction";
// import moment from "moment";
// import Highlighter from "react-highlight-words";
// import { SearchOutlined, CheckCircleOutlined } from "@ant-design/icons";
// import DeliveryDateModal from "./DeliveryDateModal";
// import { withRouter } from "react-router";
// import OpenReceivedOrderIdModal from "./OpenReceivedOrderIdModal";

// const ReceivedTable = (props) => {


//   useEffect(() => {
//     props.getReceivedUserList(props.locationDetailsId)
//   }, [])

//   const [rowData, setRowData] = useState({})
//   const handleRowData = (item) => {
//     setRowData(item)
//   }
//   const [pause, setpause] = useState(false)

//   function handlePauseResume() {
//     setpause(!pause)
//   }
//   const columns = [
//     {
//       title: "",
//       width: "2%",
//     },

//     {
//       title: "Order #",
//       dataIndex: "newOrderNo",
//       width: "15%",
//       render: (name, item, i) => {
//         const currentdate = moment().format("DD/MM/YYYY");
//         const date = moment(item.createAt).format("DD/MM/YYYY");
//         return (
//           <>
//             <span
//               style={{ textDecoration: "underline", cursor: "pointer", color: "#1890ff" }}
//               onClick={() => {
//                 handleRowData(item);
//                 props.handleReceivedOrderIdModal(true);
//               }}
//             >{item.newOrderNo}</span>
//             &nbsp;&nbsp;
//             {date === currentdate ? (
//               <span
//                 style={{
//                   color: "tomato",
//                   fontWeight: "bold",
//                 }}
//               >
//                 New
//               </span>
//             ) : null}
//           </>
//         );
//       },
//     },
//     {
//       title: "AWB",
//       width: "8%",
//       dataIndex: 'awbNo',
//     },

//     {
//       title: "Customer",
//       width: "10%",
//       dataIndex: "distributorName"
//     },
//     {
//       title: "Contact",
//       width: "10%",
//       dataIndex: "contactPersonName"
//     },
//     {
//       title: "Inspected By",
//       width: "10%",
//       dataIndex: "startInspectionUserName"
//     },
//     {
//       title: "Phones #",
//       width: "10%",
//       dataIndex: "phoneCount",
//       render: (text, item) => {
//         return (
//           <>{item.phoneReceiveCount}/{item.phoneCount}</>
//         )
//       }

//     },

//     {
//       title: "Pick Up",
//       width: "10%",
//       render: (text, item) => {
//         return (
//           <>{item.orderDetailsViewDTO && item.orderDetailsViewDTO.name || ""}</>
//         )
//       }
//     },
//     {
//       title: "",
//       width: "3%",
//       render: (name, item, i) => {
//         //debugger
//         return (
//           <Tooltip title="Notes">
//             <NoteAltIcon
//               style={{ cursor: "pointer", fontSize: "13px" }}
//               onClick={() => {
//                 handleRowData(item);
//                 props.handleInventoryReceivedNoteOrderModal(true);
//               }}
//             />

//           </Tooltip>
//         );
//       },
//     },

//     {
//       title: "",
//       width: "10%",
//       render: (name, item, i) => {
//         //debugger
//         return (
//           <>
//             {item.inspectionInd === 0 ?
//               <Button
//                 onClick={() => props.updateInspection({
//                   inspectionInd: 1,
//                   startInspectionUser: props.userId,
//                   startInspectionDate: moment()
//                 }, item.orderPhoneId, props.locationDetailsId)}
//                 style={{ backgroundColor: "#33ad33", color: "white", fontWeight: "500" }}>
//                 Start Inspection
//               </Button>
//               : item.inspectionInd === 2 ?
//                 <Button
//                   style={{ cursor: "pointer", fontSize: "13px", backgroundColor: "#3096e9", color: "white", fontWeight: "500" }}
//                   onClick={() => {
//                     handleRowData(item)
//                     props.handleDeliveryDateModal(true);
//                   }}
//                 >
//                   Send To Store
//                 </Button> :
//                 item.inspectionInd === 1 ?
//                   <Button
//                     style={{ fontWeight: "500", color: "white" }}
//                     onClick={handlePauseResume}
//                     type="primary">
//                     {pause ? "Resume Inspection" : "Pause Inspection"}
//                   </Button> : <b>Store locator</b>}
//           </>
//         );
//       },
//     },
//   ];


//   return (
//     <>
//       <StyledTable
//         rowKey=""
//         columns={columns}
//         dataSource={props.allReceivedUser}
//         loading={
//           props.fetchingReceivedUserList
//         }
//         pagination={false}
//         scroll={{ y: 160 }}

//       />

//       <DeliveryDateModal
//         rowData={rowData}
//         addDeliverDate={props.addDeliverDate}
//         handleDeliveryDateModal={props.handleDeliveryDateModal}
//       />

//       <OpenReceivedOrderIdModal
//         locationDetailsId={props.locationDetailsId}
//         rowData={rowData}
//         receivedOrdeIdModal={props.receivedOrdeIdModal}
//         handleReceivedOrderIdModal={props.handleReceivedOrderIdModal}
//       />
//       {/*
//       <InventoryNoteReceivedOrderModal
//         rowData={rowData}
//         invenReceivedNoteOrderModal={props.invenReceivedNoteOrderModal}
//         handleInventoryReceivedNoteOrderModal={props.handleInventoryReceivedNoteOrderModal}

//       /> */}
//       <Spacer />
//     </>
//   );
// }


// const mapStateToProps = ({ inventory, auth }) => ({
//   fetchingReceivedUserList: inventory.fetchingReceivedUserList,
//   allReceivedUser: inventory.allReceivedUser,
//   locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
//   addDeliverDate: inventory.addDeliverDate,
//   receivedOrdeIdModal: inventory.receivedOrdeIdModal,
//   receivedOrdeIdModal: inventory.receivedOrdeIdModal,
//   invenReceivedNoteOrderModal: inventory.invenReceivedNoteOrderModal,
//   userId: auth.userDetails.userId,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       setEditReceiveInventory,
//       getReceivedUserList,
//       handleReceivedModal,
//       handleDeliveryDateModal,
//       handleReceivedOrderIdModal,
//       handleInventoryReceivedNoteOrderModal,
//       updateInspection
//     },
//     dispatch
//   );

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(ReceivedTable)
// );
