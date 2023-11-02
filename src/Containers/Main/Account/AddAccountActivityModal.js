import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer, StyledModal } from "../../../Components/UI/Antd";
import AccountActivityTable from "./AccountActivityTable";


const AddAccountActivityModal = (props) => {
    //   console.log(props.CustomerId);
    return (
        <>
            <StyledDrawer
                title="Activity"
                width="68vw"
                visible={props.addDistributorActivityTableModal}
                maskClosable={false}
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onClose={() => props.handleDistributorActivityTableModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <AccountActivityTable distributorId={props.distributorId} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddAccountActivityModal;
