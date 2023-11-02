import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";


class AddContactPulseDrawerModal extends Component {
  render() {
    //   console.log("data5", this.props.contactData.contactId);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
        //   title={this.props.contactData.fullName}
          width="64%"
          style={{ marginTop: "5rem" }}
          visible={this.props.addDrawerContactPulseModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleContactPulseDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
           
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContactPulseDrawerModal);
