import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { StyledDrawer } from "../../../../Components/UI/Antd";
import LinkedNotes from "./CustomerTab/Notes/LinkedNotes";



class AddCustomerNotesDrawerModal extends Component {
  render() {
    //  console.log("data5", this.props.currentNameId.taskName);
console.log(this.props.rowdata)
    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.customer.name}
          width="64%"
          style={{ marginTop: "5rem" }}
          visible={this.props.addDrawerCustomerNotesModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleCustomerNotesDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <LinkedNotes customer={this.props.customer} 
            customerId={this.props.customer.customerId} 
            rowdata={this.props.rowdata}
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
)(AddCustomerNotesDrawerModal);
