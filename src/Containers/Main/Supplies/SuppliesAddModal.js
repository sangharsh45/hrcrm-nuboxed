import React, { Component } from "react";
import { Tabs, Icon, Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SuppliesForm from "./SuppliesForm";
import { StyledModal } from "../../../Components/UI/Antd";
import { StyledTabs } from "../../../Components/UI/Antd";

const TabPane = StyledTabs.TabPane;
class SuppliesAddModal extends Component {
    render() {
        const { addSuppliesModal, handleSuppliesModal } = this.props;
        return (
            <div>
                <StyledModal
                    title="Purchase"
                    width="55vw"
                    visible={addSuppliesModal}
                    destroyOnClose
                    maskClosable={false}
                    // maskStyle={{transition: '0.5s filter linear', filter: 'blur(20px)', width: '100%', height: '100%', padding: '50px', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onCancel={() => handleSuppliesModal(false)}
                    footer={null}
                >
                    <SuppliesForm />

                </StyledModal>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SuppliesAddModal);
