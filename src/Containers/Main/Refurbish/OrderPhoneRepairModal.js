import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const PhoneListForRepair = lazy(() => import("./PhoneListForRepair"));

const OrderPhoneRepairModal = (props) => {
    const { showRepairPhoneList, handleRepairPhone, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="Repair"
                width="60%"
                visible={showRepairPhoneList}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onClose={() => handleRepairPhone(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <PhoneListForRepair rowData={props.rowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default OrderPhoneRepairModal;
