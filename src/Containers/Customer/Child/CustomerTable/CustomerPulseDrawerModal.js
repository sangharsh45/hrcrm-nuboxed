import React, { Component, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";


class CustomerPulseDrawerModal extends Component {
  render() {
      console.log("data5", this.props.customer.name);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.customer.name}
          width="64%"
          style={{ marginTop: "5rem" }}
          visible={this.props.addDrawerCustomerPulseModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleCustomerPulseDrawerModal(false)}
        >
          {/* <Suspense fallback={<BundleLoader />}>
            <LinkedContactNotes contactData={this.props.contactData} 
            contactId={this.props.contactData.contactId} 
            />
          </Suspense> */}
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
)(CustomerPulseDrawerModal);
