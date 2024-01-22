import { Suspense,lazy } from 'react';
import { BundleLoader } from '../../../Components/Placeholder';

const AddMultipleQCSpare =lazy(()=>import("./AddMultipleQCSpare"));
const QCSpareListTable =lazy(()=>import("./QCSpareListTable"));

const AddingQCSpareList = (props) => {
    return (
        <>
        <Suspense fallback={<BundleLoader/>}>
            <div class="flex justify-between">
                <div class="w-[47%]">
                    <AddMultipleQCSpare RowData={props.RowData} />
                </div>
                <div class="w-[50%]">
                    <QCSpareListTable
                        phoneId={props.phoneId}
                        RowData={props.RowData}
                    />
                </div>
            </div>
            </Suspense>
        </>
    )
}

export default AddingQCSpareList