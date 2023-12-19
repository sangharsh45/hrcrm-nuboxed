import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyledTable } from "../../../../../Components/UI/Antd";
import { getAllManufatureIdById } from "../../../Refurbish/RefurbishAction"
import { handleProductBuilderInProcess } from "../../../Refurbish/RefurbishAction"
import TaggedBuilderListModal from './TaggedBuilderListModal';

const CatalogueTableByProductId = (props) => {
    useEffect(() => {
        props.getAllManufatureIdById(props.orderId, props.data.productId)
    }, [])
    const [row, setRow] = useState({})

    const handleIDClick = (item) => {
        setRow(item)
    }
    const columns = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: "ID #",
            dataIndex: "productManufacturingId",
            width: "15%",
            render: (text, item) => {
                return (
                    <>
                        <span
                            onClick={() => {
                                handleIDClick(item);
                                props.handleProductBuilderInProcess(true)
                            }}
                            style={{
                                textDecoration: "underline",
                                color: row.productManufacturingId === item.productManufacturingId ? "red" : "blue",
                                cursor: "pointer"
                            }}>
                            {item.productManufacturingId}</span>
                    </>
                )
            }

        },
        {
            title: "Name",
            dataIndex: "name",
            width: "12%",
        },
        {
            title: "Technician",
            dataIndex: "technicianName",
            width: "10%",
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
    ];

    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.allProductsByOrder}
                pagination={false}
                scroll={{ y: 600 }}
            />
            <TaggedBuilderListModal
                row={row}
                handleProductBuilderInProcess={props.handleProductBuilderInProcess}
                showProductBuilderList={props.showProductBuilderList}
            />
        </>
    );
}
const mapStateToProps = ({ refurbish }) => ({
    allProductsByOrder: refurbish.allProductsByOrder,
    showProductBuilderList: refurbish.showProductBuilderList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAllManufatureIdById,
            handleProductBuilderInProcess
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CatalogueTableByProductId);

