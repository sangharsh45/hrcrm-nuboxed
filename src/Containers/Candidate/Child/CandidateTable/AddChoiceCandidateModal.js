
import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledModal } from "../../../../Components/UI/Antd";
const CandidateChooseForm = lazy(() => import("../CandidateTable/CandidateChooseForm"));

const AddChoiceCandidateModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledModal
        title="Select talent data to share"
        width="55%"
        visible={props.addCandidateChoiceModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onCancel={() => props.handleChoiceCandidateModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CandidateChooseForm
            selectedValue={props.selectedValue}
            selectedRowKeys={props.selectedRowKeys}
            handleCandidateEmailModal={props.handleCandidateEmailModal}
            {...formProps}
          />{" "}
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddChoiceCandidateModal;

