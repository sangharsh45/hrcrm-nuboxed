import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { getCatalogueListById } from "../Account/AccountAction";
import { Button } from "antd";
import ProductBuilderList from "./ProductBuilderList";


function OrderCatalogueList(props) {
    useEffect(() => {
        props.getCatalogueListById(props.rowData.orderPhoneId)
    }, [])
    const [show, setShow] = useState(false)
    const [row, setRow] = useState({})

    const handleCatalogueList = (data) => {
        setShow(!show)
        setRow(data)
    }

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
        {
            width: "9%",
            render: (text, item) => {
                return (
                    <>
                        <Button
                            style={{ backgroundColor: item.productId === row.productId ? "orange" : "green", color: "white" }}
                            onClick={() => handleCatalogueList(item)} >See</Button></>
                )
            }
        }

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
            {show && <ProductBuilderList
                row={row}
            />}
            {/* {expand && (
                <DistributorPhoneTaskTable
                    phoneId={phoneId}
                    RowData={RowData} />
            )}
           
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderCatalogueList);
