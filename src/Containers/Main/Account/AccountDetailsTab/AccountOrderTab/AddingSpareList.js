import React from 'react'
import AddMultipleSpare from "./AddMultipleSpare";
import SpareListTable from './SpareListTable';

const AddingSpareList = (props) => {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "50%" }}>
                    <AddMultipleSpare RowData={props.RowData} />
                </div>
                <div style={{ width: "49%" }}>
                    <SpareListTable
                        phoneId={props.phoneId}
                        RowData={props.RowData}
                    />
                </div>
            </div>
        </>
    )
}

export default AddingSpareList