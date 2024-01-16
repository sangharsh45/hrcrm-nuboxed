import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import * as Yup from "yup";
import { Button, Tooltip } from "antd";
import { getDispatchUpdateList } from "../Inventory/InventoryAction"
import { MultiAvatar, SubTitle } from "../../../Components/UI/Elements";
import QRCodeModal from "../../../Components/UI/Elements/QRCodeModal";

function InspectedPhoneByOrder(props) {
    useEffect(() => {
        props.getDispatchUpdateList(props.rowData.orderPhoneId)
    }, [props.rowData.orderPhoneId])

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
            dataIndex: "conditions",
            width: "10%",
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



    ];

    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.updateDispatchList}
                pagination={false}
                scroll={{ y: 200 }}
            />

        </>
    );
}

const mapStateToProps = ({ inventory }) => ({
    updateDispatchList: inventory.updateDispatchList,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDispatchUpdateList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(InspectedPhoneByOrder);
