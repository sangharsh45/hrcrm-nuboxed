import React, { useEffect } from 'react'
import { StyledTable } from '../../../../../../Components/UI/Antd'
import { getMaterialReceivedDetailData, updateReceivedDamagedUnit } from "../../../InventoryAction"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BorderColorOutlined } from '@mui/icons-material';
import { Switch } from 'antd';

const ReceivedDetailCard = (props) => {
    useEffect(() => {
        props.getMaterialReceivedDetailData(props.row.poSupplierDetailsId)
    }, [])
    const columns = [
        {
            title: "Name",
            dataIndex: "suppliesFullName",
            width: "12%"
        },
        {
            title: "Category",
            dataIndex: "categoryName",
            render: (text, item) => {
                return (
                    <>
                        {item.categoryName} {item.subCategoryName}
                    </>
                )
            },
            width: "10%"
        },
        {
            title: "Attribute",
            render: (text, item) => {
                return (
                    <>
                        {item.attributeName} {item.subAttributeName}
                    </>
                )
            },
            width: "10%"
        },

        {
            title: "Unit",
            dataIndex: "unit",
            width: "8%"
        },
        {
            title: "Received",
            dataIndex: "unit",
            width: "8%"
        },
        {
            title: "Damaged",
            dataIndex: "unit",
            width: "8%"
        },
        {
            title: "Remark",
            dataIndex: "unit",
            width: "8%"
        },
        {
            title: "Received",
            width: "8%",
            render: (text, item) => {
                return (
                    <>
                        <Switch
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                        />
                    </>
                )
            },
        },
        {
            title: "",
            dataIndex: "",
            render: (text, item) => {
                return (
                    <>
                        <BorderColorOutlined />
                    </>
                )
            },
            width: "8%"
        },

    ]
    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.receivedDetailData}
                pagination={false}
            />
        </>
    )
}
const mapStateToProps = ({ inventory }) => ({
    receivedDetailData: inventory.receivedDetailData
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getMaterialReceivedDetailData,
        updateReceivedDamagedUnit
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedDetailCard);


