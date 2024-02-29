import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const EmployeeOverviewCard = lazy(() => import("./EmployeeCards/EmployeeOverviewCard"));
const EmployeeTopicOfInterest = lazy(() => import("./EmployeeCards/EmployeeTopicOfInterest"));
const EmployeeStatusCard = lazy(() => import("./EmployeeCards/EmployeeStatusCard"));
const EmployeeAboutCard = lazy(() => import("./EmployeeCards/EmployeeAboutCard"));
const EmployeePersonalCard = lazy(() => import("./EmployeeCards/EmployeePersonalCard"));
const EmployeeCertificationLibrary = lazy(() => import("./EmployeeCards/EmployeeCertificationLibrary"));

class EmployeeDetailLeft extends Component {
  render() {
    const { singleEmployee } = this.props;
    
    return (
      <div class=" flex flex-col display-block" >
        <EmployeeOverviewCard singleEmployee={singleEmployee} />
        <EmployeeTopicOfInterest singleEmployee={singleEmployee} />
        <EmployeeCertificationLibrary 
        singleEmployee={singleEmployee} 
        />
        <EmployeeStatusCard singleEmployee={singleEmployee} />
        <EmployeeAboutCard singleEmployee={singleEmployee} />
        {/* <EmployeeDetailMap singleEmployee={singleEmployee} /> */}
        <EmployeePersonalCard singleEmployee={singleEmployee} />
      </div>
    );
  }
}
const mapStateToProps = ({ employee }) => ({
  singleEmployee: employee.singleEmployee,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetailLeft);
