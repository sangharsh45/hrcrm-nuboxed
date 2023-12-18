import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ rowData }) => {
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open QR Code
      </Button>
      <Modal title="QR Code" visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input
          type="text"
          style={{border:"2px solid black"}}
          placeholder="Enter text for QR code"
          value={text}
          onChange={handleInputChange}
        />
        <div style={{marginTop:"20px"}}>
        <QRCode value={text} />
        </div>
      </Modal>
    </div>
  );
};

export default QRCodeGenerator;