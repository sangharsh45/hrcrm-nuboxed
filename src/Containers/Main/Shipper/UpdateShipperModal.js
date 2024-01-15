import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
 const UpdateShipperForm = lazy(() => import("./UpdateShipperForm"));

const UpdateShipperModal = (props) => {
  const { ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage id="app.shipper" defaultMessage="Shipper"/>}
        width="60%"
        visible={props.updateShipperModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"3rem"}}
        onClose={() => props.handleUpdateShipperModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateShipperForm 
            rowdata={props.rowdata}
          shipperId={props.shipperId} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateShipperModal;
