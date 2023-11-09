import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledModal } from "../../../../Components/UI/Antd";
import DistributorProductTable from "./DistributorProductTable";

const DistributorProductHistory = (props) => {
    // console.log(props.ActivitysId);
    const { ...formProps } = props;
    return (
        <>
            <StyledModal
                title="Order History"
                width="55vw"
                visible={props.collectionDistributorOrder}
                maskClosable={false}
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onCancel={() => props.handleDistributorProductModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <DistributorProductTable
                        orderId={props.particularRowData.orderId}
                    />
                </Suspense>
            </StyledModal>
        </>
    );
};

export default DistributorProductHistory;
