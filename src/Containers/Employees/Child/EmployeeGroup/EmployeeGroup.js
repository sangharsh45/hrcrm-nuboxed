import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GroupView } from "../../../../Components/Common";
import SingleEmployee from "./SingleEmployee";
import { getEmployeelist } from "../../EmployeeAction";

class EmployeeGroup extends Component {
  componentDidMount() {
    debugger;
    this.props.getEmployeelist();
  }
  render() {
    console.log(this.props.employees);
    return (
      <>
        <br />

        <GroupView
          groupTitle="All Employees"
          isFetching={this.props.fetchingEmployee}
          noData={!this.props.employees.length}
          length={this.props.employees.length}
        >
          {(isViewAll, toggleViewAll) =>
            !isViewAll ? (
              <div>
                {this.props.employees &&
                  this.props.employees.slice(0, 5).map((employee, i) => {
                    return (
                      <SingleEmployee
                        key={employee.employeeId}
                        employee={employee}
                      />
                    );
                  })}
              </div>
            ) : (
              <div>
                {this.props.employees &&
                  this.props.employees.map((employee, i) => {
                    return (
                      <SingleEmployee
                        key={employee.employeeId}
                        employee={employee}
                      />
                    );
                  })}
              </div>
            )
          }
        </GroupView>
      </>
    );
  }
}

const mapStateToProps = ({ employee }) => ({
  employees: employee.employees,
  fetchingEmployee: employee.fetchingEmployee,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEmployeelist,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeGroup);
