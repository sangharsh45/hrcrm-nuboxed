import React, { useEffect, useState } from 'react'
import { getCatalogueByUser, handleProductBuilderInProcess } from "./RefurbishAction"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Tooltip } from 'antd'
import { StyledTable } from '../../../Components/UI/Antd'
import TagBuilderInCatalogueProcess from "./TagBuilderInCatalogueProcess"

const CatalogueListForOrder = (props) => {
    useEffect(() => {
        props.getCatalogueByUser(props.rowData.orderId, props.userId)
    }, [])
    const [row, setRow] = useState({})

    const handleCatalogueList = (data) => {
        setRow(data)
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
        },
        {
            title: "Name",
            dataIndex: "name",
            width: "12%",

        },
        {
            title: "Category",
            dataIndex: "categoryName",
            width: "7%",
        },
        {
            title: "Sub Category",
            dataIndex: "subCategoryName",
            width: "9%",
        },
        {
            title: "Attribute",
            dataIndex: "attributeName",
            width: "7%",

        },
        {
            title: "Sub Attribute",
            dataIndex: "subAttributeName",
            width: "7%",
        },
        {
            width: "7%",
            render: (text, item) => {
                return (
                    <>
                        <Tooltip title="Product Builder">
                            <Button
                                style={{ backgroundColor: item.productManufacturingId === row.productManufacturingId ? "orange" : "green", color: "white" }}
                                onClick={() => {
                                    props.handleProductBuilderInProcess(true)
                                    handleCatalogueList(item)
                                }}
                            >
                                Tag
                            </Button>
                        </Tooltip>

                    </>
                )
            }
        }

    ];

    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.catalogueByUser}
                pagination={false}
                scroll={{ y: 600 }}
            />
            <TagBuilderInCatalogueProcess
                handleProductBuilderInProcess={props.handleProductBuilderInProcess}
                showProductBuilderList={props.showProductBuilderList}
                row={row}
            />
        </>
    );
}
const mapStateToProps = ({ refurbish, auth }) => ({
    catalogueByUser: refurbish.catalogueByUser,
    userId: auth.userDetails.userId,
    showProductBuilderList: refurbish.showProductBuilderList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getCatalogueByUser,
            handleProductBuilderInProcess
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CatalogueListForOrder);

