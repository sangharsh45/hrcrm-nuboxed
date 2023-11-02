import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const AssignPhoneByTechnician = lazy(() => import("./AssignPhoneByTechnician"));

const AssignOrderModal = (props) => {
    const { assignOrderById, handleAssignOrderById, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="Assign For QC"
                width="60%"
                visible={assignOrderById}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onClose={() => handleAssignOrderById(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <AssignPhoneByTechnician rowData={props.rowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AssignOrderModal;
