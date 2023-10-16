import Item from "antd/lib/list/Item";
import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const UpdateDealForm = lazy(() => import("./UpdateDealForm"));

const UpdateDealModal = (props) => {
  return (
    <>
      <StyledDrawer
        title={props.currentItem.opportunityName}
        width="60%"
        style={{marginTop:"5rem"}}
        visible={props.openupdateDealModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleUpdateDealModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateDealForm currentItem={props.currentItem} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateDealModal;
