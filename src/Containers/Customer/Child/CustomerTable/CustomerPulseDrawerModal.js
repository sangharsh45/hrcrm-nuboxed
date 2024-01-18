import React, { Component,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import CustomerPulseJumpstart from "./CustomerPulseJumpstart";


class CustomerPulseDrawerModal extends Component {
  render() {
      console.log("data5", this.props.customer.name);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.customer.name}
          width="60%"
          style={{ marginTop: "3rem" }}
          visible={this.props.addDrawerCustomerPulseModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleCustomerPulseDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <CustomerPulseJumpstart 
            customer={this.props.customer}
            />
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
)(CustomerPulseDrawerModal);
