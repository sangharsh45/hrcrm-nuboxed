import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TextInput } from "../../../../../Components/UI/Elements";
import AddressComponent from "../../../../../Components/Common/AddressComponent";

class ShipperOverViewDataEdit extends Component {
  render() {
    const {
      shipper: { shipperId, addresses },
    } = this.props;
    return (
      <>
        {addresses &&
          addresses.map((components, i) => (
            <AddressComponent
              key={i}
              editable
              //   editAddressType="user"
              //   userId={userId}
              components={components}
            />
          ))}
      </>
    );
  }
}

const mapStateToProps = ({ shipper }) => ({
  // updatingCustomerById: distributor.updatingCustomerById,
  // customerId: distributor.distributor.contactId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // updateCustomerById
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperOverViewDataEdit);

class EditableInput extends Component {
  render() {
    const { width } = this.props;
    return (
      <TextInput
        onChange={this.props.handleChange}
        defaultValue={this.props.defaultValue}
        value={this.props.value}
        name={this.props.name}
        placeholder={this.props.name}
        width={width}
      />
    );
  }
}
