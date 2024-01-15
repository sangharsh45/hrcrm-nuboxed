import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const OrderQCandRepairHistory = lazy(() => import("./OrderQCandRepairHistory"));

const TechnicianModal = (props) => {
    const { showTechnicianModal, handleTechnicianModal, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="Order History"
                width="60%"
                visible={showTechnicianModal}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onClose={() => handleTechnicianModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <OrderQCandRepairHistory rowData={props.rowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default TechnicianModal;
