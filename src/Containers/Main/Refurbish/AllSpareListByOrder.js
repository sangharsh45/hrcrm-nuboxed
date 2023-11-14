import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const ApproveSpareTable = lazy(() => import("./ApproveSpareTable"));

const AllSpareListByOrder = (props) => {
    const { approveSpareModal, handleAllSpareList, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="Approve Spare"
                width="60%"
                visible={approveSpareModal}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onClose={() => handleAllSpareList(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <ApproveSpareTable rowData={props.rowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AllSpareListByOrder;
