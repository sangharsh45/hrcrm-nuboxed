import React, { Suspense } from "react";
import OrderPhoneDetails from "./OrderPhoneDetails";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
// const AddProductionForm = lazy(() => import("./AddProductionForm"));

const ProductionOrderModal = (props) => {
    const { addOrderPhone, handleOrderPhone, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="Phone List"
                width="60%"
                visible={addOrderPhone}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onClose={() => handleOrderPhone(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <OrderPhoneDetails rowData={props.rowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default ProductionOrderModal;
