import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../Components/UI/Antd";
import { getPhonelistById, handlePhoneNotesOrderModal, updateQCStatus } from "../../AccountAction";
import * as Yup from "yup";
import { Button, Tooltip } from "antd";
import { MultiAvatar, SubTitle } from "../../../../../Components/UI/Elements";
import QRCodeModal from "../../../../../Components/UI/Elements/QRCodeModal";
import ButtonGroup from "antd/lib/button/button-group";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import PhoneNotesOrderModal from "./PhoneNotesOrderModal";
import AccountPhoneTaskTable from "./AccountPhoneTaskTable";
import AddingSpareList from "./AddingSpareList";

const FormSchema = Yup.object().shape({
    pauseNoOfDays: Yup.string().required("Input required!"),
    pauseDate: Yup.string().required("Input required!"),
});

function DistributorPauseForm(props) {
    useEffect(() => {
        props.getPhonelistById(props.particularRowData.orderId)
    }, [])

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

    function StatusIcon({ type, size, indStatus, iconType, tooltip, status, id, onClick, phoneId }) {
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

    // function handleQCStatus(type) {
    //   setActive(type)
    //   console.log(type)
    //   console.log(RowData.phoneId)
    //   const data = {
    //     qcStatus: type,
    //     orderPhoneId: props.particularRowData.orderId,
    //     phoneId: RowData.phoneId
    //   }
    //   props.updateQCStatus(data, RowData.phoneId, props.particularRowData.orderId)
    // }

    console.log(RowData)
    const columns = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: "Company",
            dataIndex: "company",
            width: "11%",

        },
        {
            title: "Model",
            dataIndex: "model",
            width: "9%",
        },
        {
            title: "IMEI",
            dataIndex: "imei",
            width: "10%",
        },
        {
            title: "OS",
            dataIndex: "os",
            width: "10%",

        },
        {
            title: "GB",
            dataIndex: "gb",
            width: "8%",
        },
        {
            title: "Color",
            dataIndex: "color",
            width: "9%",
        },
        {
            title: "Condition",
            dataIndex: "condition",
            width: "10%",
        },
        {
            title: "Expected Price",
            dataIndex: "expectedPrice",
            width: "13%",
        },
        {
            title: "Total Hours",
            dataIndex: "totalhours",
            width: "10%",
        },
        {
            title: "Total Cost",
            dataIndex: "totalExtraCost",
            width: "12%",
        },
        {
            title: "Final Price",
            dataIndex: "totalPrice",
            width: "10%",
        },
        {
            title: "QC",
            width: "15%",

            render: (text, item) => {
                return (
                    <>
                        <ButtonGroup>
                            <StatusIcon
                                color="blue"
                                type="To Start"
                                iconType="fa-hourglass-start"
                                tooltip="To Start"
                                status={active}
                                id={item.phoneId}
                                indStatus={item.qcStatus}
                                phoneId={RowData.phoneId}

                            />
                            <StatusIcon
                                type="In Progress"
                                iconType="fa-hourglass-half"
                                tooltip="In Progress"
                                id={item.phoneId}
                                indStatus={item.qcStatus}
                                phoneId={RowData.phoneId}
                                status={active}

                            />
                            <StatusIcon
                                type="Complete"
                                iconType="fa-hourglass"
                                tooltip="Complete"
                                status={active}
                                id={item.phoneId}
                                indStatus={item.qcStatus}
                                phoneId={RowData.phoneId}

                            />
                        </ButtonGroup>
                    </>
                )
            }
        },
        {
            title: "QR",
            width: "5%",
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
            width: "4%",
            render: (name, item, i) => {
                //debugger
                return (
                    <Tooltip title="Spare">
                        <PrecisionManufacturingIcon
                            style={{ color: spares && item.phoneId === RowData.phoneId ? "red" : "black" }}

                            onClick={() => {
                                handleSetRowData(item);
                                hanldeSpare();
                            }}
                        />

                    </Tooltip>
                );
            },
        },
        {
            title: "",
            width: "4%",
            render: (name, item, i) => {
                //debugger
                return (
                    <Tooltip title="Task">
                        <FormatListBulletedIcon
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
            width: "4%",
            render: (name, item, i) => {
                //debugger
                return (
                    <Tooltip title="Notes">
                        <NoteAltIcon
                            style={{ cursor: "pointer", fontSize: "13px" }}
                            onClick={() => {
                                handleSetRowData(item);
                                props.handlePhoneNotesOrderModal(true);
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
                dataSource={props.phoneListById}
                pagination={false}
                scroll={{ y: 200 }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {expand && (
                <AccountPhoneTaskTable
                    phoneId={phoneId}
                    RowData={RowData} />
            )}
            <PhoneNotesOrderModal
                RowData={RowData}
                phoNotesOrderModal={props.phoNotesOrderModal}
                handlePhoneNotesOrderModal={props.handlePhoneNotesOrderModal}
            />
            {spares && (
                <AddingSpareList
                    phoneId={phoneId}
                    RowData={RowData}
                />
            )}
        </>
    );
}

const mapStateToProps = ({ distributor }) => ({
    phoneListById: distributor.phoneListById,
    phoNotesOrderModal: distributor.phoNotesOrderModal
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPhonelistById,
            handlePhoneNotesOrderModal,
            updateQCStatus
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DistributorPauseForm);
