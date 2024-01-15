import React, { lazy, Suspense } from "react";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import TeamsForm from "./TeamsForm";


const TeamsModal = props => {
  const { addTeamsModal, handleTeamsModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title="Teams"
        width="60%"
        visible={addTeamsModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ marginTop: "5rem" }}
        onClose={() => handleTeamsModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <TeamsForm {...formProps} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default TeamsModal;