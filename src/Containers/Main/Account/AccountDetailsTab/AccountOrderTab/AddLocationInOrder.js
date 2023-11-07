import React, { lazy, Suspense } from "react";
import { StyledModal } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
const LocationOrderForm = lazy(() => import("./LocationOrderForm"));

const AddLocationInOrder = (props) => {
    const { ...formProps } = props;
    return (
        <>
            <StyledModal
                title={`Add to - ${props.particularRowData.newOrderNo}`}
                width="25vw"
                visible={props.addInventoryInOrder}
                maskClosable={false}
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onCancel={() => props.handleInventoryLocationInOrder(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <LocationOrderForm particularRowData={props.particularRowData} />
                </Suspense>
            </StyledModal>
        </>
    );
};

export default AddLocationInOrder;
