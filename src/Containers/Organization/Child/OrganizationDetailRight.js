import React, { Component, lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { FlexContainer } from "../../../Components/UI/Layout";

const OrganizationDetailTab = lazy(() => import('./OrganizationTabs/OrganizationDetailTab'))
class OrganizationDetailRight extends Component {
    render() {

        return (
            <FlexContainer flexDirection='column' style={{ display: 'block' }}>
                <OrganizationDetailTab userDetails={this.props.userDetails} />
            </FlexContainer>
        )
    }
}
const mapStateToProps = ({ auth }) => ({
    userDetails: auth.userDetails
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationDetailRight);