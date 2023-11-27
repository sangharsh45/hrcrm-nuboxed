import React from 'react'
import { StyledTable } from '../../../../../Components/UI/Antd'

const AccountOrder1Table = () => {
    const column = [
        {
            title: "Order#"
        },
        {
            title: "Date"
        },
        {
            title: "Amount"
        },
    ]
    return (
        <>
            <StyledTable
                rowKey=""
                columns={column}
                //  dataSource={deletedDistributors}
                //  loading={props.fetchingDeletedDistributors || props.fetchingDeletedDistributorsError}
                pagination={false}
                scroll={{ y: 320 }}
            />
        </>
    )
}

export default AccountOrder1Table
