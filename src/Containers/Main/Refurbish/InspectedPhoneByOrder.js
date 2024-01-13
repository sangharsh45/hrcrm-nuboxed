import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import * as Yup from "yup";
import { Button, Tooltip } from "antd";
import { MultiAvatar, SubTitle } from "../../../Components/UI/Elements";
import QRCodeModal from "../../../Components/UI/Elements/QRCodeModal";


function InspectedPhoneByOrder(props) {
    // useEffect(() => {
    //     props.getNoOfPhoneById(props.rowData.orderPhoneId)
    // }, [props.rowData.orderPhoneId])

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
            width: "9%",
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

        // {
        //     title: "QR",
        //     width: "5%",
        //     render: (name, item, i) => {
        //         return (
        //             <SubTitle>
        //                 {item.qrCodeId ? (
        //                     <QRCodeModal
        //                         qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
        //                         imgHeight={"2.8em"}
        //                         imgWidth={"2.8em"}
        //                         imgRadius={20}
        //                     />
        //                 ) : (
        //                     <span style={{ fontSize: "0.6em", fontWeight: "bold" }}>
        //                         No QR
        //                     </span>
        //                 )}
        //             </SubTitle>
        //         );
        //     },
        // },



    ];

    return (
        <>
            <StyledTable
                columns={columns}
                // dataSource={props.phoneListById}
                pagination={false}
                scroll={{ y: 200 }}
            />

        </>
    );
}

const mapStateToProps = ({ distributor }) => ({

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // getNoOfPhoneById
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(InspectedPhoneByOrder);
