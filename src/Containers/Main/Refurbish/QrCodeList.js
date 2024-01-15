import 'webrtc-adapter'; 
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';


const QRCodeListScanner = (props) => {
 

  return (
    <>
      <Button onClick={props.startScanning}>Open Scanner</Button>

      <Modal
        title="QR Code Scanner"
        visible={props.modalVisible}
        onCancel={props.stopScanning}
        destroyOnClose={true}
        // footer={[
        //   <Button key="send" type="primary" onClick={sendToApi}>
        //     Send
        //   </Button>,
        // ]}
      >
        {props.shouldRenderCamera && props.scanning && (
          <div className={`qr-code-scanner-container`}>
            <QrReader onResult={props.handleScan} onError={props.handleError} onClose={props.stopScanning} />
            <p>{props.data}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default QRCodeListScanner;