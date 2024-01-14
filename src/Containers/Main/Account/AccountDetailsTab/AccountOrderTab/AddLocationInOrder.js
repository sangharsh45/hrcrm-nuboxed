import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
const LocationOrderForm = lazy(() => import("./LocationOrderForm"));

const AddLocationInOrder = (props) => {
    const { ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Select location for Order # - ${props.particularRowData.newOrderNo}`}
                width="40vw"
                visible={props.addInventoryInOrder}
                maskClosable={false}
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ marginTop: "5rem" }}
                onClose={() => props.handleInventoryLocationInOrder(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <LocationOrderForm particularRowData={props.particularRowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddLocationInOrder;
