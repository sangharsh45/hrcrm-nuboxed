
import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const UpdateOpportunityForm = lazy(() => import("./UpdateOpportunityForm"));

const UpdateOpportunityModal = (props) => {
  return (
    <>
      <StyledDrawer
        title={props.opportunityData.opportunityName}
        width="60%"
        style={{marginTop:"3rem"}}
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
