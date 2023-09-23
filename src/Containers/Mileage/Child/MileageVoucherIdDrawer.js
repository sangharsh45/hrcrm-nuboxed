import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const MileageDrawerCard=lazy(()=>import("./MileageDrawerCard"));

const MileageVoucherIdDrawer = (props) => {
  const { mileageVoucherIdDrawer, handleMileageVoucherIdDrwer,voucherId, ...formProps } = props;
  console.log(voucherId)
  return (
    
    <>
      <StyledDrawer
        title={`Mileage: ${voucherId}`}
        width="60%"
        visible={mileageVoucherIdDrawer}
        destroyOnClose
        closable
        placement="right"
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => handleMileageVoucherIdDrwer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <MileageDrawerCard voucherId={voucherId}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default MileageVoucherIdDrawer;
