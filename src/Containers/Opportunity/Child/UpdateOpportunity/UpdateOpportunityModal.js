
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
        visible={props.updateOpportunityModal}
        onClose={() => props.handleUpdateOpportunityModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateOpportunityForm opportunityId={props.opportunityData.opportunityId} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateOpportunityModal;
