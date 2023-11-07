import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LinkShipperOrderForm from "./LinkShipperOrderForm";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import { StyledTabs } from "../../../../../../Components/UI/Antd";

const TabPane = StyledTabs.TabPane;
class LinkShipperOrderConfigureModal extends Component {
  render() {
    const {
      addLinkShipperOrderConfigureModal,
      handleLinkShipperOrderConfigureModal,
    } = this.props;
    return (
      <div>
        <StyledModal
          title=" Order Configure"
          width="60vw"
          visible={addLinkShipperOrderConfigureModal}
          destroyOnClose
          maskClosable={false}
          // maskStyle={{transition: '0.5s filter linear', filter: 'blur(20px)', width: '100%', height: '100%', padding: '50px', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleLinkShipperOrderConfigureModal(false)}
          footer={null}
        >
          <StyledTabs defaultActiveKey="1">
            <TabPane tab={`Product`} key="1">
              <div style={{ marginTop: 20 }}>
                <LinkShipperOrderForm />
              </div>
            </TabPane>
          </StyledTabs>
        </StyledModal>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkShipperOrderConfigureModal);
