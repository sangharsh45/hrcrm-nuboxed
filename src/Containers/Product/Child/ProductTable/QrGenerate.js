import React, { useState } from 'react';
import { Modal, Button, Checkbox } from 'antd';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
  const data={
    category:"Windmill",
    subcategory:"Axex",
    Attribute:"1 Unit",
   
}
  const [selectedValues, setSelectedValues] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleCheckboxChange = (key, value) => {
    setSelectedValues((prev) => ({ ...prev, [key]: value }));
  };

  const checkboxKeys = Object.keys(data);

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open QR Code
      </Button>
      <Modal title="QR Code" visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div>
          {checkboxKeys.map((key) => (
            <Checkbox
              key={key}
              onChange={() => handleCheckboxChange(key, data[key])}
              checked={selectedValues[key]}
            >
              {key}
            </Checkbox>
          ))}
        </div>
       
        <QRCode value={Object.values(selectedValues).join(', ')} />
      </Modal>
    </div>
  );
};

export default QRCodeGenerator;