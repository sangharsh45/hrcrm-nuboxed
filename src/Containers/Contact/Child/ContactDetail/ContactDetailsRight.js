import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const ContactDetailTab = lazy(() => import("./ContactTab/ContactDetailTab"));

class ContactDetailsRight extends Component {
  render() {
    return (
      <div class=" w-full">
        <ContactDetailTab contact={this.props.contact} />
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDetailsRight);
