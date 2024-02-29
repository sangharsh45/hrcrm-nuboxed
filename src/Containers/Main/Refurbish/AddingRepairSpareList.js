import React,{lazy,Suspense} from 'react'
import { BundleLoader } from '../../../Components/Placeholder';
const RepairSpareListTable=lazy(()=>import("./RepairSpareListTable")); 

const AddingRepairSpareList = (props) => {
    return (
        <>
<Suspense fallback={<BundleLoader/>}>
            <RepairSpareListTable
                phoneId={props.phoneId}
                RowData={props.RowData}
            />
</Suspense>
        </>
    )
}

export default AddingRepairSpareList
