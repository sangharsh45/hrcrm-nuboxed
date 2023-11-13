import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { getPhoneOrderIdByUser, handleQCPhoneNotesOrderModal, getOrderByUser } from "./RefurbishAction";
import { Button, Tooltip } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";
import QRCodeModal from "../../../Components/UI/Elements/QRCodeModal";
import { SubTitle } from "../../../Components/UI/Elements";
import ButtonGroup from "antd/lib/button/button-group";
import { updateQCStatus } from "../Account/AccountAction"
import moment from "moment";
import QCPhoneNotesOrderModal from "./QCPhoneNotesOrderModal";
import AddingQCSpareList from "./AddingQCSpareList";
import { NoteAddOutlined } from "@mui/icons-material";
import DistributorPhoneTaskTable from "./DistributorPhoneTaskTable";

function OrderPhoneListById(props) {
    useEffect(() => {
        props.getPhoneOrderIdByUser(props.rowData.orderPhoneId, props.userId)
    }, [props.rowData.orderPhoneId, props.userId])

    const [RowData, setRowData] = useState({});
    function handleSetRowData(item) {
        setRowData(item);
    }
    const [expand, setExpand] = useState(false);
    const [spares, setspares] = useState(false);
    const [phoneId, setphoneId] = useState("");

    function handleExpand(phoneId) {
        setExpand(!expand);
        setspares(false)
        setphoneId(phoneId);
    }
    function hanldeSpare(phoneId) {
        setspares(!spares);
        setExpand(false)
        setphoneId(phoneId);
    }
    function StatusIcon({ type, size, iconType, tooltip, status, id, onClick, phoneId, indStatus }) {
        const start = type;
        console.log(start);
        //////debugger;
        if (status === type) {
            size = "30px";
        } else {
            size = "16px";
        }
        return (
            <Tooltip title={tooltip}>
                <Button
                    ghost={status !== type}
                    style={{
                        padding: "6px",
                        borderColor: "transparent",
                        color: indStatus === type ? "orange" : "grey",
                    }}
                    onClick={onClick}
                >
                    <i className={`fas ${iconType}`} style={{ fontSize: "22px" }}></i>
                </Button>
            </Tooltip>
        );
    }

    const [active, setActive] = useState("To Start")

    function handleQCStatus(type, item) {
        setActive(type)
        console.log(type)
        console.log(item)
        const data = {
            qcStatus: type,
            orderPhoneId: props.rowData.orderId,
            phoneId: item.phoneId,
            qcTechnicianId: props.userId,
            qcInspectionInd: type === "Complete" ? 2 : 1
        }
        props.updateQCStatus(data, item.phoneId, props.rowData.orderPhoneId, handleCallBack)
    }
    const handleCallBack = () => {
        props.getPhoneOrderIdByUser(props.rowData.orderPhoneId, props.userId)
        props.getOrderByUser(props.locationId, props.userId)
    }
    const [hide, setHide] = useState(false);

    function handlePuaseButton() {
        setHide(hide)
    }
    const columns = [
        {
            title: "",
            dataIndex: "",
            width: "2%",
        },
        {
            title: "Company",
            dataIndex: "company",
            width: "15%",

        },
        {
            title: "Model",
            dataIndex: "model",
            width: "12%",
        },
        {
            title: "IMEI",
            dataIndex: "imei",
            width: "12%",
        },
        {
            title: "QR Code",
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
            width: "12%",
            render: (text, item) => {
                return (
                    <>
                        {props.rowData.qcInspectionInd === 1 && <ButtonGroup>
                            {/* <StatusIcon
                                color="blue"
                                type="To Start"
                                iconType="fa-hourglass-start"
                                tooltip="To Start"
                                status={active}
                                indStatus={item.qcStatus}
                                id={item.phoneId}
                                phoneId={RowData.phoneId}
                                onClick={() => {
                                    handleQCStatus("To Start", item);
                                }}
                            /> */}
                            <StatusIcon
                                type="In Progress"
                                iconType="fa-hourglass-half"
                                tooltip="In Progress"
                                id={item.phoneId}
                                indStatus={item.qcStatus}
                                phoneId={RowData.phoneId}
                                status={active}
                                onClick={() => {
                                    handleQCStatus("In Progress", item);
                                }}
                            />
                            <StatusIcon
                                type="Complete"
                                iconType="fa-hourglass"
                                tooltip="Complete"
                                indStatus={item.qcStatus}
                                status={active}
                                id={item.phoneId}
                                phoneId={RowData.phoneId}
                                onClick={() => {
                                    handleQCStatus("Complete", item);
                                }}
                            />
                        </ButtonGroup>}
                    </>
                )
            }
        },
        {
            title: "Start Time",
            width: "10%",
            render: (text, item) => {
                const time = moment(item.qcStartTime).add(5, 'hours');
                const starttimme = time.add(30, 'minutes')
                return (
                    <>{item.qcStartTime === null ? "" : moment(starttimme).format('LT')}</>
                )
            }
        },
        {
            title: "End Time",
            width: "10%",
            render: (text, item) => {
                const time = moment(item.qcEndTime).add(5, 'hours');
                const endtimme = time.add(30, 'minutes')
                return (
                    <>{item.qcEndTime === null ? "" : moment(endtimme).format('LT') || ""}</>
                )
            }
        },

        {
            title: "Actual Effort",
            width: "10%",
            render: (text, item) => {
                return (
                    <>{item.estimateQcTimeHours || "0"}H:{item.estimateQcTimeMinutes || "0"}M:{item.estimateQcTimeSeconds || "0"}S</>
                )
            }
        },
        {
            title: "Estimated Hours",
            width: "10%",
            dataIndex: "totalhours"
        },

        {
            title: "",
            width: "3%",
            render: (name, item, i) => {
                //debugger
                return (
                    <Tooltip title="Spare">
                        <span style={{ color: spares && item.phoneId === RowData.phoneId ? "red" : "black" }}

                            onClick={() => {
                                handleSetRowData(item);
                                hanldeSpare();
                            }}>
                            <i class="fab fa-linode"></i>
                        </span>


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
                    <Tooltip title="Task">
                        <FileDoneOutlined
                            style={{ color: expand && item.phoneId === RowData.phoneId ? "red" : "black" }}
                            type="file-done"
                            onClick={() => {
                                handleSetRowData(item);
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
                        <NoteAddOutlined
                            style={{ cursor: "pointer", fontSize: "13px" }}
                            onClick={() => {
                                handleSetRowData(item);
                                props.handleQCPhoneNotesOrderModal(true);
                            }}
                        />

                    </Tooltip>
                );
            },
        },
    ];


    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.orderPhoneList}
                pagination={false}
                scroll={{ y: 200 }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {props.rowData.qcInspectionInd === 1 ? <Button
                    type="primary"
                    onClick={handlePuaseButton}>{hide ? "Resume" : "Pause"}
                </Button> : null}
            </div>
            {spares && (
                <AddingQCSpareList
                    phoneId={phoneId}
                    RowData={RowData}
                />
            )}
            {expand && (
                <DistributorPhoneTaskTable
                    phoneId={phoneId}
                    RowData={RowData} />
            )}

            <QCPhoneNotesOrderModal
                RowData={RowData}
                phoNotesQCOrderModal={props.phoNotesQCOrderModal}
                handleQCPhoneNotesOrderModal={props.handleQCPhoneNotesOrderModal}
            />
        </>
    );
}

const mapStateToProps = ({ refurbish, auth }) => ({
    orderPhoneList: refurbish.orderPhoneList,
    locationId: auth.userDetails.locationId,
    userId: auth.userDetails.userId,
    phoNotesQCOrderModal: refurbish.phoNotesQCOrderModal,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPhoneOrderIdByUser,
            updateQCStatus,
            handleQCPhoneNotesOrderModal,
            getOrderByUser
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderPhoneListById);
