import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../Components/UI/Antd";
import { getCatalogueListById } from "../../AccountAction";


function OrderCatalogueDetails(props) {
    useEffect(() => {
        props.getCatalogueListById(props.particularRowData.orderId)
    }, [])

    const columns = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: "Name",
            dataIndex: "name",
            width: "15%",

        },
        {
            title: "Category",
            dataIndex: "categoryName",
            width: "9%",
        },
        {
            title: "Sub Category",
            dataIndex: "subCategoryName",
            width: "9%",
        },
        {
            title: "Attribute",
            dataIndex: "attributeName",
            width: "9%",

        },
        {
            title: "Sub Attribute",
            dataIndex: "subAttributeName",
            width: "9%",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            width: "9%",
        },


    ];

    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.catalogueById}
                pagination={false}
                scroll={{ y: 600 }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {/* {expand && (
                <DistributorPhoneTaskTable
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
            )} */}
        </>
    );
}

const mapStateToProps = ({ distributor }) => ({
    catalogueById: distributor.catalogueById
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getCatalogueListById
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderCatalogueDetails);
