import React from "react";

import { StyledModal } from "../../../../../../Components/UI/Antd";
import ReceivedForm from "./ReceivedForm";

const ReceivedModal = (props) => {
  const { ...formProps } = props;
  return (
    <>
      <StyledModal
        title="Received"
        width="50%"
        height="100vh"
        visible={props.receivedModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleReceivedModal(false)}
        footer={null}
      >
        <ReceivedForm />
      </StyledModal>
    </>
  );
};

export default ReceivedModal;
