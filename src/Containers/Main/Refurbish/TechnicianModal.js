import React, { Suspense, lazy } from "react";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const TechnicianListByOrderId = lazy(() => import("./TechnicianListByOrderId"));

const TechnicianModal = (props) => {
    const { showTechnicianModal, handleTechnicianModal, ...formProps } = props;
    return (
        <>
            <StyledModal
                title="Technician"
                width="60%"
                visible={showTechnicianModal}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onCancel={() => handleTechnicianModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <TechnicianListByOrderId rowData={props.rowData} />
                </Suspense>
            </StyledModal>
        </>
    );
};

export default TechnicianModal;
