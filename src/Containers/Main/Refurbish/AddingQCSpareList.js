import React from 'react'
import AddMultipleQCSpare from "./AddMultipleQCSpare";
import QCSpareListTable from './QCSpareListTable';

const AddingQCSpareList = (props) => {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "47%" }}>
                    <AddMultipleQCSpare RowData={props.RowData} />
                </div>
                <div style={{ width: "50%" }}>
                    <QCSpareListTable
                        phoneId={props.phoneId}
                        RowData={props.RowData}
                    />
                </div>
            </div>
        </>
    )
}

export default AddingQCSpareList