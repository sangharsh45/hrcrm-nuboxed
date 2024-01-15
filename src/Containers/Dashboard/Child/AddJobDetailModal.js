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
        style={{marginTop:"3rem"}}
        visible={props.addjobDetailModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        //style={{ top: 40 }}
        onClose={() => props.handleAddJobDetailtModal(false)}
        footer={null}
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
