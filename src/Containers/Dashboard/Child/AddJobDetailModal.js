import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const DashboardDetails = lazy(() => import("./DashboardDetails"));

const AddJobDetailModal = (props) => {
  const { ...formProps } = props;

  console.log("group",props.item.jobOrder)

  return (
    <>
      <StyledDrawer
        // title="Opportunity"
    title={props.item.jobOrder}
        width="60%"
        visible={props.addjobDetailModal}
        onClose={() => props.handleAddJobDetailtModal(false)}

      >
        
        <Suspense fallback={<BundleLoader />}>
          {/* <OpportunityRequirementBoard
           candidateRequirement={props.candidateRequirement}
          item={props.item}
           />{" "} */}
           <DashboardDetails
            candidateRequirement={props.candidateRequirement}
            // detail={this.detail}
            item={props.item}
           />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddJobDetailModal;
