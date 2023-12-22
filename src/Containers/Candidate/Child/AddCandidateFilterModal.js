import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
 const CandidateFilterForm = lazy(() => import("../Child/CandidateFilterForm"));

const AddCandidateFilterModal = props => {
  const { addCandidateFilterModal, handleCandidateFilterModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title="Filter Talent"
        width="60%"
        visible={addCandidateFilterModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ marginTop: "3rem" }}
        onClose={() => handleCandidateFilterModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CandidateFilterForm 
           />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCandidateFilterModal;
