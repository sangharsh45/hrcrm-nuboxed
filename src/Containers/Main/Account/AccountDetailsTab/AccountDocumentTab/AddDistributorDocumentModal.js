import React, { lazy, Suspense, Component } from "react";
import { Button } from "antd";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
const DistributorDocumentForm = lazy(() => import("./DistributorDocumentForm"));

const ButtonGroup = Button.Group;

class AddDistributorDocumentModal extends Component {
  render() {
    const {
      distributorDocumentUploadModal,
      handleDistributorDocumentUploadModal,
    } = this.props;
    return (
      <>
        <StyledDrawer
          title="Document"
          width="65vw"
          visible={distributorDocumentUploadModal}
          destroyOnClose
          maskClosable={false}
          style={{marginTop:"5rem"}}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => handleDistributorDocumentUploadModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <DistributorDocumentForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddDistributorDocumentModal;
