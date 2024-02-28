import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import { getPhonelistByOrderId } from "../../../InventoryAction";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Button, Tooltip } from "antd";
import { handleReceivedOrderIdPhoneNoteModal, updateInspection, setEditPhoneData, handlereceivePhoneModal } from "../../../InventoryAction";
import { EditOutlined, FileDoneOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import ReceivedOrderIdPhoneNoteModal from "./ReceivedOrderIdPhoneNoteModal";
import QRCodeModal from "../../../../../../Components/UI/Elements/QRCodeModal";
import { MultiAvatar2, SubTitle } from "../../../../../../Components/UI/Elements";
import ReceiveValidationToggle from "./ReceiveValidationToggle";
import ReceivedModal from "./ReceivedPhoneModal";
import dayjs from "dayjs";
import AccountPhoneTaskTable from "../../../../Account/AccountDetailsTab/AccountOrderTab/AccountPhoneTaskTable";


function OpenReceivedOrderIdForm(props) {
  useEffect(() => {
    props.getPhonelistByOrderId(props.rowData.orderPhoneId)
  }, [])
  const [pause, setpause] = useState(false)
  function handlePauseResume() {
    setpause(!pause)
  }
  const [particularRowData, setParticularRowData] = useState({});
  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
  }
  const [expand, setExpand] = useState(false);
  const [phoneId, setphoneId] = useState("");

  function handleExpand(phoneId) {
    setExpand(!expand);
    setphoneId(phoneId);
  }
  console.log(props.phoneListData)
  const columns = [
    {
      title: "",
      dataIndex: "",
      width: "1%",
    },
    {
      title: "OEM",
      dataIndex: "company",
      width: "10%",

    },
    {
      title: "Model",
      dataIndex: "model",
      width: "9%",
    },
    {
      title: "IMEI",
      dataIndex: "imei",
      width: "8%",
    },
    {
      title: "OS",
      dataIndex: "os",
      width: "8%",

    },
    {
      title: "GB",
      dataIndex: "gb",
      width: "8%",
    },
    {
      title: "Color",
      dataIndex: "color",
      width: "6%",
    },
    {
      title: "Condition",
      dataIndex: "conditions",
      width: "6%",
    },
    {
      title: "",
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
              <span class="text-[0.6rem] font-bold">
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
            <FileDoneOutlined style={{ color: "black", fontSize: "1rem" }} type="file-done"

              onClick={() => {
                handleSetParticularOrderData(item);
                handleExpand(item.phoneId);
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
              style={{ cursor: "pointer", fontSize: "1rem", color: "green" }}
              onClick={() => {
                handleSetParticularOrderData(item);
                props.handleReceivedOrderIdPhoneNoteModal(true);
              }}
            />

          </Tooltip>
        );
      },
    },

    {
      title: "Received",
      width: "7%",
      render: (name, item, i) => {
        //debugger
        return (
          <Tooltip>
            {item.inspectionInd === 1 &&
              <ReceiveValidationToggle
                orderPhoneId={props.rowData.orderPhoneId}
                phoneId={item.phoneId}
                receivePhoneInd={item.receivePhoneInd}
                inspectionInd={item.inspectionInd} />
            }
          </Tooltip>
        );
      },
    },
    {
      title: "Received by",
      width: "11%",
      dataIndex: "receivePhoneUserName",
      render: (text, item) => {

        return (
          <>
            {item.receivePhoneUserName !== null &&
              <>
                <Tooltip title={item.receivePhoneUserName}>
                  <MultiAvatar2
                    primaryTitle={item.receivePhoneUserName}
                    imageURL={item.imageURL}
                    imgWidth={"1.8rem"}
                    imgHeight={"1.8rem"}
                  />
                </Tooltip>
                &nbsp;
                {dayjs(item.receivePhoneDate).format("ll")}
              </>
            }
          </>
        )
      }
    },
    {
      title: "",
      width: "3%",
      render: (name, item, i) => {
        //debugger
        return (
          <Tooltip>
            {item.inspectionInd === 1 && item.receivePhoneInd && (
              <EditOutlined
                style={{ color: "orange" }}
                onClick={() => {
                  props.setEditPhoneData(item);
                  props.handlereceivePhoneModal(true);
                  handleSetParticularOrderData(item);
                }
                }
              />
            )
            }
          </Tooltip>
        );
      },
    },
  ];

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight - 150;
  return (
    <>
      <StyledTable
        rowKey="phoneId"
        columns={columns}
        dataSource={props.phoneListById}
        pagination={false}
        loading={props.fetchingPhoneListById}
        scroll={{ y: tableHeight }}
        expandable={{
          expandedRowRender: (record) => (
            <>
              <div style={{ display: "flex", justifyContent: "space-evenly", fontSize: "12px" }}>
                <div> <b>Receive company:<span style={{ color: "red", marginLeft: "2px" }}>{record.receiveCompany}</span></b> </div>
                <div> <b>Receive Model:<span style={{ color: "red", marginLeft: "2px" }}>{record.receiveModel}</span></b> </div>
                <div> <b>Receive IMEI:<span style={{ color: "red", marginLeft: "2px" }}>{record.receiveIMEI}</span></b> </div>
                <div> <b>Receive OS:<span style={{ color: "red", marginLeft: "2px" }}>{record.receiveOS} </span></b></div>
                <div> <b>Receive GB:<span style={{ color: "red", marginLeft: "2px" }}>{record.receiveGB}</span></b> </div>
                <div> <b>Receive Color:<span style={{ color: "red", marginLeft: "2px" }}>{record.receiveColor}</span></b> </div>
                <div> <b>Receive Condition:<span style={{ color: "red", marginLeft: "2px" }}>{record.receiveCondition}</span></b> </div>
              </div>
            </>
          ),
          rowExpandable: (record) => record.mismatchInd === true,
        }}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {props.rowData.inspectionInd === 1 &&
          <Button type="primary"
            onClick={handlePauseResume}>
            {pause ? "Resume" : "Pause"}</Button>}
        {props.rowData.inspectionInd === 1 &&
          <div style={{ marginLeft: '10px' }}>
            <Button
              onClick={() => props.updateInspection({
                inspectionInd: 2,
                stopInspectionUser: props.userId,
                stopInspectionDate: dayjs()
              },
                props.rowData.orderPhoneId,
                props.locationDetailsId)}
              type="primary"
            >Inspection Completed</Button>
          </div>}
      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {expand && (
        <AccountPhoneTaskTable
          phoneId={phoneId}
          RowData={particularRowData} />
      )}
      <ReceivedOrderIdPhoneNoteModal
        particularRowData={particularRowData}
        phoNoteReceivedOrderIdModal={props.phoNoteReceivedOrderIdModal}
        handleReceivedOrderIdPhoneNoteModal={props.handleReceivedOrderIdPhoneNoteModal}
      />
      <ReceivedModal
        handlereceivePhoneModal={props.handlereceivePhoneModal}
        addReceivePhone={props.addReceivePhone}
        orderPhoneId={props.rowData.orderPhoneId}
        particularRowData={particularRowData}
      />
    </>
  );
}

const mapStateToProps = ({ inventory, distributor, auth }) => ({
  phoneListById: distributor.phoneListById,
  fetchingPhoneListById: distributor.fetchingPhoneListById,
  phoneListData: inventory.phoneListData,
  userId: auth.userDetails.userId,
  addReceivePhone: inventory.addReceivePhone,
  phoNoteReceivedOrderIdModal: inventory.phoNoteReceivedOrderIdModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPhonelistByOrderId,
      handleReceivedOrderIdPhoneNoteModal,
      updateInspection,
      setEditPhoneData,
      handlereceivePhoneModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpenReceivedOrderIdForm);
