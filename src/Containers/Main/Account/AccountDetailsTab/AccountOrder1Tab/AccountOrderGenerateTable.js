import React from 'react'
import { StyledTable } from '../../../../../Components/UI/Antd'

const AccountOrderGenerateTable = () => {
    const column = [
        {
            title: "Name"
        },
        {
            title: "Catagory"
        },
        {
            title: "Sub-Category"
        },

        {
            title: "Attribute"
        },
        {
            title: "Sub-attribute"
        },
        {
            title: "Quantity"
        },
    ]
    return (
        <div>
            <StyledTable
                rowKey=""
                columns={column}
                //  dataSource={deletedDistributors}
                //  loading={props.fetchingDeletedDistributors || props.fetchingDeletedDistributorsError}
                pagination={false}
                scroll={{ y: 320 }}
            />
        </div>
    )
}

export default AccountOrderGenerateTable
