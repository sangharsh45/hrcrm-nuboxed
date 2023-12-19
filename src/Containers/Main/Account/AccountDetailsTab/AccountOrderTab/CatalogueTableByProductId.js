import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyledTable } from "../../../../../Components/UI/Antd";
import { getAllManufatureIdById } from "../../../Refurbish/RefurbishAction"

const CatalogueTableByProductId = (props) => {
    useEffect(() => {
        props.getAllManufatureIdById(props.data.productId)
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
            render: (text, item) => {
                return (
                    <>
                        <span
                            // onClick={handleNameClick}
                            style={{ textDecoration: "underline", color: "blue" }}>
                            {item.name}</span>
                    </>
                )
            }

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
        </>
    );
}
const mapStateToProps = ({ refurbish }) => ({
    allProductsByOrder: refurbish.allProductsByOrder
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAllManufatureIdById
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CatalogueTableByProductId);

