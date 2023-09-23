import React, { lazy, Suspense } from "react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

import { BundleLoader } from "../../../../../../Components/Placeholder";

import { StyledDrawer, StyledModal } from "../../../../../../Components/UI/Antd";
const RequirementDetailForm = lazy(() => import("./RequirementDetailForm"));

const AddRequirementDetailModal = (props) => {
  const [visible, setVisible] = useState(true)
  // setTimeout(() => {
  //   return (
  //     setVisible(true)
  //   )
  // }, 3000)
  return (
    <>
      <StyledDrawer
        title="Requirement"
        width="58%"
        visible={props.addRequirementDetailModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={() => props.handleAddRequiremenDetailtModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {visible && < RequirementDetailForm />
          }


        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddRequirementDetailModal;
