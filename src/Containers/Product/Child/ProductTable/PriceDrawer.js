import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const PriceAddTable=lazy(()=>import("./PriceAddTable"));

const PriceDrawer = (props) => {
  const { priceOpenDrawer, handlePriceDrawer,  particularDiscountData, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={`Price`}
        width={drawerWidth}
        visible={priceOpenDrawer}
        destroyOnClose
        closable
        placement="right"
        style={{marginTop:"3rem"}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => handlePriceDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
        <PriceAddTable particularDiscountData={particularDiscountData}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default PriceDrawer;
