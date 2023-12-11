import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer, StyledModal } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const ProductbuilderTable=lazy(()=>import("./ProductbuilderTable"));
const ProductbuilderTable2=lazy(()=>import("./ProductbuilderTable2"));

const ProductBuilderDrawer = (props) => {
  const { proBuilderDrawer, handleProductBuilderDrawer,  particularDiscountData, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "55%";
  return (
    <>
      <StyledDrawer
        title={`Product Builder`}
        width={drawerWidth}
        visible={proBuilderDrawer}
        destroyOnClose
        closable
        placement="right"
        style={{marginTop:"5rem"}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => handleProductBuilderDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <ProductbuilderTable   particularDiscountData={particularDiscountData}/>
          <ProductbuilderTable2 particularDiscountData={particularDiscountData}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default ProductBuilderDrawer;
