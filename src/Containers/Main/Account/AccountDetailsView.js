import {  } from "enzyme";
import React, { Component, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "../../../Components/Common";

class AccountDetailsView extends Component {
    render() {
        return (
            <>
                <Link toUrl={`distributor/${this.props.distributorId}`} title={`${this.props.name}`} />
            </>
        );
    }
}
const mapStateToProps = ({ distributor, auth }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsView);




