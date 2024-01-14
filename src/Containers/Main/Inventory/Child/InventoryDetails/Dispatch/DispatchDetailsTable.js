
import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import {
  getDispatchUpdateList,
  updateDispatchInspectionButton,
} from "../../../InventoryAction";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Button, Switch, Tooltip } from "antd";
import { EditOutlined, FileDoneOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import QRCodeModal from "../../../../../../Components/UI/Elements/QRCodeModal";
import { SubTitle } from "../../../../../../Components/UI/Elements";
import DispatchReceiveToggle from "./DispatchReceiveToggle";
import moment from "moment";
import DispatchTaskTable from "./DispatchTaskTable";


function OpenReceivedOrderIdForm(props) {
  useEffect(() => {
    props.getDispatchUpdateList(props.rowData.orderPhoneId)
  }, [])

  const [rowData, setRowData] = useState({});
  const [phoneId, setphoneId] = useState("");
  const [task, setTask] = useState(false);

  const handlePhoneTask = (id) => {
    setTask(!task)
    setphoneId(id);
  }
  const handleRowData = (data) => {
    setRowData(data)
  }
  const columns = [
    {
      title: "",
      dataIndex: "",
      width: "1%",
    },
    {
      title: "Company",
      dataIndex: "company",
      width: "9%",

    },
    {
      title: "Model",
      dataIndex: "model",
      width: "8%",
    },
    {
      title: "IMEI",
      dataIndex: "imei",
      width: "8%",
    },
    {
      title: "OS",
      dataIndex: "os",
      width: "7%",

    },
    {
      title: "GB",
      dataIndex: "gb",
      width: "7%",
    },
    {
      title: "Color",
      dataIndex: "color",
      width: "9%",
    },
    {
      title: "Condition",
      dataIndex: "conditions",
      width: "9%",
    },
    {
      title: "Technician",
      dataIndex: "repairTechnicianName",
      width: "10%",
    },
    {
      title: "Received By",
      dataIndex: "dispatchPhoneUserName",
      width: "10%",
    },

    {
      title: "QR",
      width: "8%",
      render: (name, item, i) => {
        return (
          <SubTitle>
            {item.qrCodeId ? (
              <QRCodeModal
                qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                imgHeight={"2.8em"}
                imgWidth={"2.8em"}
                imgRadius={20}
              />
            ) : (
              <span style={{ fontSize: "0.6em", fontWeight: "bold" }}>
                No QR
              </span>
            )}
          </SubTitle>
        );
      },
    },
    {
      title: "",
      width: "3%",
      render: (name, item, i) => {
        //debugger
        return (
          <Tooltip title="Task">
            <FileDoneOutlined style={{ color: "black" }} type="file-done"
              onClick={() => {
                handleRowData(item);
                handlePhoneTask(item.phoneId);
              }}
            />

          </Tooltip>
        );
      },
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
            // onClick={() => {
            //   handleSetParticularOrderData(item);
            //   props.handleReceivedOrderIdPhoneNoteModal(true);
            // }}
            />

          </Tooltip>
        );
      },
    },
    {
      title: "Inspected",
      width: "8%",
      render: (name, item, i) => {
        //debugger
        return (
          <Tooltip>
            {props.rowData.dispatchInspectionInd === 1 && <DispatchReceiveToggle
              phoneId={item.phoneId}
              dispatchPhoneInd={item.dispatchPhoneInd}
              dispatchInspectionInd={item.dispatchInspectionInd}
              orderPhoneId={props.rowData.orderPhoneId}
            />}
          </Tooltip>
        );
      },
    },

  ];


  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight - 200;
  return (
    <>
      <StyledTable
        columns={columns}
        dataSource={props.updateDispatchList}
        pagination={false}
        scroll={{ y: tableHeight }}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {props.rowData.dispatchInspectionInd === 1 && <Button type="primary">Pause</Button>}
        {props.rowData.dispatchInspectionInd === 1 &&
          <div style={{ marginLeft: '10px' }}>
            <Button
              onClick={() => props.updateDispatchInspectionButton({
                dispatchInspectionInd: 2,
                stopDispatchInspectionUser: props.userId,
                stopDispatchInspectionDate: moment()
              },
                props.rowData.orderPhoneId,
                props.locationDetailsId)}
              type="primary"
            >Inspection Completed</Button>
          </div>}
      </div>
      {task && <DispatchTaskTable phoneId={phoneId} />}
    </>
  );
}

const mapStateToProps = ({ inventory, distributor, auth }) => ({
  updateDispatchList: inventory.updateDispatchList,
  locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
  phoNoteReceivedOrderIdModal: inventory.phoNoteReceivedOrderIdModal,
  userId: auth.userDetails.userId
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDispatchUpdateList,
      updateDispatchInspectionButton,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpenReceivedOrderIdForm);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledModal, StyledTable } from "../../../../../Components/UI/Antd";

// import { CurrencySymbol } from "../../../../../Components/Common";
// import APIFailed from "../../../../../Helpers/ErrorBoundary/APIFailed";
// import { getDispatchUpdateList } from "../../../InventoryAction";
// import moment from "moment";
// import { Tooltip } from "antd";

// class DispatchDetailsTable extends Component {
//   componentDidMount() {
//     this.props.getDispatchUpdateList(this.props.dispatchId);
//     console.log(this.props.dispatchId);
//   }
//   componentDidUpdate(prvP, prvS) {
//     console.log(prvP);
//     if (this.props.dispatchId !== prvP.dispatchId) {
//       this.props.getDispatchUpdateList(this.props.dispatchId);
//     }
//   }

//   render() {
//     const columns = [
//       {
//         title: "",
//         width: "2%",
//       },
//       {
//         title: "Product ID",
//         dataIndex: "productId",
//         width: "15%",
//       },
//       {
//         title: "Category",
//         dataIndex: "categoryName",
//         width: "11%",
//       },
//       {
//         title: "Sub-cat",
//         dataIndex: "subCategoryName",
//         width: "11%",
//       },

//       {
//         title: "Attribute",
//         render: (name, item, i) => {
//           return `${item.attributeName || ""} ${item.subAttributeName || ""} `;
//         },
//         width: "13%",
//       },

//       {
//         title: "Name",
//         dataIndex: "name",
//         width: "18%",
//       },
//       {
//         // title: "Mfg ID",
//         title: "",
//         // dataIndex: "inventoryProductId",
//         render: (name, item, i) => {
//           return item.inventoryProductId ? (
//             <Tooltip title={item.inventoryProductId}>
//               <i class="fas fa-industry"></i>
//             </Tooltip>
//           ) : null;
//         },
//         width: "3%",
//       },
//       {
//         title: " Mfg",
//         dataIndex: "manufactureDate",
//         render: (name, item, i) => {
//           return moment(item.manufactureDate).format("DD-MM-YY");
//         },

//         width: "8%",
//       },
//       {
//         title: "Units",
//         dataIndex: "units",
//         width: "8%",
//       },
//     ];
//     // if (this.this.props.fetchingOrderDetailsByIdError) {
//     //   return <APIFailed />
//     // }

//     return (
//       <>
//         {true && (
//           <StyledTable
//             rowKey=""
//             columns={columns}
//             dataSource={this.props.updateDispatchList}
//             loading={
//               this.props.fetchingUpdateDispatchList ||
//               this.props.fetchingUpdateDispatchListError
//             }
//             scroll={{ y: 320 }}
//             pagination={false}
//           />
//         )}
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ inventory }) => ({
//   fetchingUpdateDispatchList: inventory.fetchingUpdateDispatchList,
//   receivedDetailsList: inventory.receivedDetailsList,
//   updateDispatchList: inventory.updateDispatchList,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getDispatchUpdateList,
//     },
//     dispatch
//   );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(DispatchDetailsTable);