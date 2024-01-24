import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../Components/UI/Antd'
import { Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllSpareList } from "./RefurbishAction"

const ApproveSpareTable = (props) => {

    useEffect(() => {
        props.getAllSpareList(props.rowData.orderPhoneId)
    }, [])
    const [selectedRow, setselectedRow] = useState([]);
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setselectedRow(selectedRows);
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
    };
    const columns = [
        {
            title: "Spare",
            dataIndex: "sparename"
        },
        {
            title: "Company",
            dataIndex: "sparename"
        },

    ]
    return (
        <>
            <StyledTable
                rowKey="sparePhoneId"
                rowSelection={rowSelection}
                columns={columns}
                pagination={false}
                dataSource={props.allSpareById}
                loading={props.fetchingALlSPareList}
            />
            <div class="flex justify-end">
                <Button type='primary'>Approve</Button>
            </div>
        </>
    )
}
const mapStateToProps = ({ refurbish, auth }) => ({
    allSpareById: refurbish.allSpareById,
    fetchingALlSPareList: refurbish.fetchingALlSPareList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAllSpareList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ApproveSpareTable);
