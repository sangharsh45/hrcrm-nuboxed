import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import StatusMileageForm from "./StatusMileageForm";


const StatusMileageDrawer = (props) => {
  const { updateStatusMileageModal, handleStatusMileageModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        //title="Apply for Leaves"
        title={<FormattedMessage
          id="app.applyforleaves"
          defaultMessage="Status Mileage"
        />}
        width="30vw"
        visible={updateStatusMileageModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        // style={{ top: 40 }}
        style={{marginTop:"5rem"}}
        onClose={() => handleStatusMileageModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <StatusMileageForm leaveId={props.leaveId} />{" "} 
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default StatusMileageDrawer;
