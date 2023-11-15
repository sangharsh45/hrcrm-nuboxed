import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";

const MileageNote =lazy(()=>import("./MileageNote"));

const MileageNoteDrawer = (props) => {
  const { noteMileageDrawer, handleMileageNoteDrawer,milaegeItems, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={`Note - ${milaegeItems.mileageId}`}
        width="35vw"
        visible={noteMileageDrawer}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onClose={() => handleMileageNoteDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <MileageNote milaegeItems={milaegeItems} />{" "} 
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default MileageNoteDrawer;
