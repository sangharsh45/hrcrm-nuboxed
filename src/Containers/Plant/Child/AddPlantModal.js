import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledModal } from "../../../Components/UI/Antd";

const AddPlantForm = lazy(() => import("./AddPlantForm"));
class AddPlantModal extends Component {
  render() {
    const { addPlantModal, handlePlantModal, ...formProps } = this.props;
    return (
      <>
        <StyledModal
          title="Add Plant"
          width="55%"
          visible={addPlantModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handlePlantModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <AddPlantForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddPlantModal;
