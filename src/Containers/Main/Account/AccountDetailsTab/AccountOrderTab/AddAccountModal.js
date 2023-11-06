import React, { Component } from "react";
import { Tabs, Icon, Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer, StyledModal } from "../../../../../Components/UI/Antd";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import AccountStepper from "./AccountStepper";

const TabPane = StyledTabs.TabPane;
class AddAccountModal extends Component {
    render() {
        const { addLinkDistributorOrderConfigureModal, handleLinkDistributorOrderConfigureModal } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Add Order"
                    width="60vw"
                    visible={addLinkDistributorOrderConfigureModal}
                    destroyOnClose
                    maskClosable={false}
                    // maskStyle={{transition: '0.5s filter linear', filter: 'blur(20px)', width: '100%', height: '100%', padding: '50px', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}

                    onClose={() => handleLinkDistributorOrderConfigureModal(false)}
                    footer={null}
                >
                    <AccountStepper />

                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddAccountModal);
