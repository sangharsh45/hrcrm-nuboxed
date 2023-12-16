import React, { Component,Suspense } from "react";
import { Tabs, Icon, Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductForm from "../Child/ProductForm";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { StyledTabs } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";

const TabPane = StyledTabs.TabPane;
class ConfigureModal extends Component {
  render() {
    const { addConfigureModal, handleConfigureModal } = this.props;
    return (
      <div>
        <StyledDrawer
          title="Add Product"
          width="60%"
          visible={addConfigureModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop:"3rem" }}
          onClose={() => handleConfigureModal(false)}
          footer={null}
        >
           <Suspense fallback={<BundleLoader />}>
        <ProductForm />
        </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ConfigureModal);
