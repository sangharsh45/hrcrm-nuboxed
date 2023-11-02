import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "../../../Components/Common";

class ShipperDetailView extends Component {
  render() {
    return (
      <>
        <Link
          toUrl={`shipper/${this.props.shipperId}`}
          title={`${this.props.name}`}
        />
      </>
    );
  }
}
const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShipperDetailView);
