import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OrganizationHeaderTab from "./Child/OrganizationHeader/OrganizationHeaderTab";


class OrganizationActionLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }





  render() {

    return (
      <>
   

      <OrganizationHeaderTab     handleOnClick={this.props.handleOnClick}/>
 
  
 
  
      </>
    );
  }
}
const mapStateToProps = ({ auth, customer, contact, opportunity }) => ({
  organizationDetailsList:auth.organizationDetailsList,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationActionLeft);
