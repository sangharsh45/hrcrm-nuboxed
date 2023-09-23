import React,{ lazy, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import ReactCustomerSpeeech from "./ReactCustomerSpeeech"

const ReactCustomerSpeechModal = props => {
  const { addCustomerSpeechModal, handleCustomerReactSpeechModal } = props;
  console.log(props);
  return (
    <>
      <StyledDrawer
        title="Click to start Recording"
        width="40vw"
        visible={addCustomerSpeechModal}
        maskClosable={false}
        destroyOnClose
        style={{marginTop:"5rem"}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => handleCustomerReactSpeechModal(false)}
        footer={null}
      >
         <Suspense fallback={<BundleLoader />}>
        <ReactCustomerSpeeech
        customerId={props.customerId}
        />
        </Suspense>
      </StyledDrawer>
    </>
  );
};
export default ReactCustomerSpeechModal ;
