import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import CheckInInventoryLocation from "./CheckInInventoryLocation";

const TabPane = StyledTabs.TabPane;
class OrderGenerateModal extends Component {
    render() {
        const { generateOrderModal, handleOrderGenerateModal } = this.props;
        return (
            <div>
                <StyledDrawer
                    title=" Generate Order"
                    width="60vw"
                    visible={generateOrderModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onClose={() => handleOrderGenerateModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <CheckInInventoryLocation />
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrderGenerateModal);
