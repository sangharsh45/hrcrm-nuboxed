import React from 'react'
import RepairSpareListTable from './RepairSpareListTable'

const AddingRepairSpareList = (props) => {
    return (
        <>

            <RepairSpareListTable
                phoneId={props.phoneId}
                RowData={props.RowData}
            />

        </>
    )
}

export default AddingRepairSpareList
