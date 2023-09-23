import React from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import ReactLeadsSpeeech from "./ReactLeadsSpeeech";

const ReactLeadsrSpeechModal = props => {
  const { addLeadsSpeechModal, handleLeadsReactSpeechModal } = props;
  console.log(props);
  return (
    <>
      <StyledDrawer
        title="Click to start Recording"
        width="40vw"
        visible={addLeadsSpeechModal}
        maskClosable={false}
        destroyOnClose
        style={{ marginTop:"5rem" }}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onCancel={() => handleLeadsReactSpeechModal(false)}
        footer={null}
      >
        <ReactLeadsSpeeech
        leadsId={props.leadsId}
        />
      </StyledDrawer>
    </>
  );
};
export default ReactLeadsrSpeechModal ;
