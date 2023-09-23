import React from "react";
import { Divider } from "antd";
import { StyledModal } from "../UI/Antd";
import { HeaderText } from "../UI/Elements";

export default function NewsModal(props) {
  const { newsModal, currentNews, handleModalClose } = props;
  return (
    <StyledModal
      title=""
      width="31.25em"
      closable={false}
      visible={newsModal}
      maskClosable
      destroyOnClose
      // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
      maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
      style={{ top: 40, padding: 0, borderRadius: 20 }}
      onCancel={handleModalClose}
      footer={null}
      bodyPadding="0em"
      modalBorderRadius={"0.3125em"}
    >
      <div style={{ padding: "1rem" }}>
        <HeaderText>{currentNews.title}</HeaderText>
        <Divider />
        <p>{currentNews.text}</p>
      </div>
    </StyledModal>
  );
}
