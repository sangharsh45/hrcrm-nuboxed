import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import EmployeeDetailHeader from "./EmployeeDetailHeader";
import {
  FlexContainer,
  MainWrapper,
} from "../../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { getEmployeeById } from "../../../EmployeeAction";
const EmployeeDetailLeft = lazy(() => import("./EmployeeDetailLeft"));
const EmployeeDetailRight = lazy(() => import("./EmployeeDetailRight"));

class EmployeeDetails extends Component {
  componentDidMount() {
    this.props.getEmployeeById(this.props.match.params.id);
    console.log(this.props.location);
  }

  render() {
    const { singleEmployee, fetchingEmployeeById } = this.props;

    console.log(this.props.employeeId);
    return (
      <>
        <EmployeeDetailHeader />
        {this.props.fetchingEmployeeById ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
          <FlexContainer>
            <Suspense fallback={""}>
              <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                <div style={{ width: "25%" }}>
                  <EmployeeDetailLeft  singleEmployee= {singleEmployee}/>
                </div>
                <div style={{ width: "75%" }}>
                  <EmployeeDetailRight singleEmployee= {singleEmployee}/>
                </div>
              </FlexContainer>
            </Suspense>
          </FlexContainer>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ employee }) => ({
  fetchingEmployeeById: employee.fetchingEmployeeById,
  singleEmployee: employee.singleEmployee,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getEmployeeById }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails);
