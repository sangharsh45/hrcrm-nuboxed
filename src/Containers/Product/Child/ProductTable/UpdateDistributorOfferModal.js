import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledModal } from "../../../../Components/UI/Antd";
import UpdateDistributorOfferForm from "./UpdateDistributorOfferForm";


const UpdateDistributorOfferModal = (props) => {
    console.log(props.productId);
    const { ...formProps } = props;
    return (
        <>
            <StyledModal
                title="Update Offer"
                width="55vw"
                visible={props.updateDistributorOfferModal}
                maskClosable={false}
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onCancel={() => props.handleUpdateDistributorOfferModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <UpdateDistributorOfferForm />
                </Suspense>
            </StyledModal>
        </>
    );
};

export default UpdateDistributorOfferModal;
