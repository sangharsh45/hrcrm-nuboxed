import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import AddOrderForm from "./AddOrderForm";

const TabPane = StyledTabs.TabPane;
class CatalogueOrderModal extends Component {
    render() {
        const { addCatalogueOrderModal, handleAddOrderModal } = this.props;
        return (
            <div>
                <StyledDrawer
                    title=" Add Catalogue"
                    width="60vw"
                    visible={addCatalogueOrderModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onClose={() => handleAddOrderModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <AddOrderForm />
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CatalogueOrderModal);
