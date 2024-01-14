import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const CatalogueListForOrder = lazy(() => import("./CatalogueListForOrder"));
const PhoneListForRepair = lazy(() => import("./PhoneListForRepair"));

const OrderPhoneRepairModal = (props) => {
    const { showRepairPhoneList, handleRepairPhone, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="Assign"
                width="70%"
                visible={showRepairPhoneList}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ marginTop: "5rem" }}
                onClose={() => handleRepairPhone(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    {props.inspectionRequiredInd ?
                        <CatalogueListForOrder rowData={props.rowData} /> :
                        <PhoneListForRepair rowData={props.rowData} />}
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default OrderPhoneRepairModal;
