import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { Spacer } from "../../../Components/UI/Elements";
import { getDeleteHistory } from "./SuppliesAction";
import ReInstateSupplies from "./ReInstateSupplies";

function SuppliesDeletedTable(props) {
    useEffect(() => {
        props.getDeleteHistory()
    }, [])

    const columns = [
        {
            title: "",
            width: "2%",
        },
        {
            title: "Name",
            // width: "15%",
            defaultSortOrder: "descend",

        },

        {
            title: "Mobile",
            dataIndex: "phoneNo",
            render: (name, item, i) => {
                return (
                    <>
                        {item.dialCode} {item.phoneNo}
                    </>
                )
            }
        },
        {
            title: "Websites",
            dataIndex: "url",
        },
        {
            title: "Address",
            render: (name, item, i) => {
                return `${item.addresses[0].address1 || ""} ${item.addresses[0]
                    .address2 || ""} ${item.addresses[0].street || ""} 
                ${item.addresses[0].city || ""}
                    `;
            },
        },     
        {
            title: "City",
            render: (name, item, i) => {
                return `${item.addresses[0].city || ""}`;
            },
        },
        {
            title: "Pin Code",
            render: (name, item, i) => {
                return `${item.addresses[0].pinCode || ""}`;
            },
        },
        {
            title: "Re-Instate",
            margin: "8%",
            render: (name, item, i) => {
                return (
                    <>
                        <ReInstateSupplies suppliesId={item.suppliesId} />
                    </>
                );
            },
        },
    ];
    // if (props.fetchingDeletedDistributorsError) {
    //     return <APIFailed />
    // }

    return (
        <>
            <StyledTable
                rowKey=""
                columns={columns}
                dataSource={props.deleteSuppliesHistory}
                loading={props.fetchingDeletedSuppliesHistory || props.fetchingDeletedSuppliesHistoryError}
                pagination={false}
                scroll={{ y: 320 }}
            />
            <Spacer />
        </>
    );
}
const mapStateToProps = ({ supplies }) => ({
    deleteSuppliesHistory: supplies.deleteSuppliesHistory,
    fetchingDeletedSuppliesHistory: supplies.fetchingDeletedSuppliesHistory
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDeleteHistory
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliesDeletedTable);
