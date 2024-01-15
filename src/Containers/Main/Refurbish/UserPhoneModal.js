import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const PhonesByTechnicianUser = lazy(() => import("./PhonesByTechnicianUser"));

const UserPhoneModal = (props) => {
    const { phoneByTechnician, handlePhoneByTechnician, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="Phone List"
                width="60%"
                visible={phoneByTechnician}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onClose={() => handlePhoneByTechnician(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <PhonesByTechnicianUser rowData={props.rowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default UserPhoneModal;
