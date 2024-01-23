import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const OrderPhoneListById = lazy(() => import("./OrderPhoneListById"));

const OrderPhoneModal = (props) => {
    const { showPhoneList, handleOrderPhoneModal,rowData, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={rowData.newOrderNo}
                width="80%"
                visible={showPhoneList}
                closable
                destroyOnClose
                onClose={() => handleOrderPhoneModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <OrderPhoneListById rowData={rowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default OrderPhoneModal;
