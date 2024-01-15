import React, { lazy, Suspense } from "react";
import { StyledDrawer, StyledModal } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
const AddShipperForm = lazy(() => import("./AddShipperForm"));

const AddShipperModal = (props) => {
    const { addShipperModal, handleShipperModal, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={<FormattedMessage id="app.shipper" defaultMessage="Shipper"/>}
                width="60%"
                visible={addShipperModal}
                closable
                // maskClosable={false}
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{marginTop:"3rem"}}
                onClose={() => handleShipperModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <AddShipperForm {...formProps} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddShipperModal;
