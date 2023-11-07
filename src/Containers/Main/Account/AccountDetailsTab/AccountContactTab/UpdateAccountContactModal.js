import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
const UpdateAccountContactForm = lazy(() => import("./UpdateAccountContactForm"));

const UpdateAccountContactModal = (props) => {
    const { ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="Update Contact"
                width="65vw"
                visible={props.updateDistributorContactModal}
                maskClosable={false}
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onClose={() => props.handleUpdateDistributorContactModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <UpdateAccountContactForm />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default UpdateAccountContactModal;
