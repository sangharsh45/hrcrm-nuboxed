import React, { lazy, Suspense } from 'react'
const AddMultipleSpare = lazy(() => import("./AddMultipleSpare"));
const SpareListTable = lazy(() => import('./SpareListTable'));

const AddingSpareList = (props) => {
    return (
        <>
            <Suspense fallback={"Loading"}>
                <div class="flex justify-between">
                    <div class="w-[47%]">
                        <AddMultipleSpare RowData={props.RowData} />
                    </div>
                    <div class="w-[50%]">
                        <SpareListTable
                            phoneId={props.phoneId}
                            RowData={props.RowData}
                        />
                    </div>
                </div>
            </Suspense>
        </>
    )
}

export default AddingSpareList