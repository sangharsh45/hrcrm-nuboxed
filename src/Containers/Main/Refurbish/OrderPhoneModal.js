import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const OrderPhoneListById = lazy(() => import("./OrderPhoneListById"));

const OrderPhoneModal = (props) => {
    const { showPhoneList, handleOrderPhoneModal, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="QC"
                width="60%"
                visible={showPhoneList}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onClose={() => handleOrderPhoneModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <OrderPhoneListById rowData={props.rowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default OrderPhoneModal;
