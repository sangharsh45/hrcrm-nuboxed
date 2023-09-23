import Item from "antd/lib/list/Item";
import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const UpdateOpportunityForm = lazy(() => import("./UpdateOpportunityForm"));

const UpdateOpportunityModal = (props) => {
  return (
    <>
      <StyledDrawer
        title={props.opportunityData.opportunityName}
        width="47%"
        style={{marginTop:"5rem"}}
        visible={props.updateOpportunityModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleUpdateOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateOpportunityForm opportunityId={props.opportunityData.opportunityId} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateOpportunityModal;
