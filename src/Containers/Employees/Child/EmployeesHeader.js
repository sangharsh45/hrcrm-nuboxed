import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import EmployeesActionLeft from "./EmployeesActionLeft";
import EmployeesActionRight from "./EmployeesActionRight";
class EmployeesHeader extends Component {
  render() {
    const { handleEmployeeModal,
       viewType, setEmployeeViewType ,
       handleChange,
      currentData,
      handleClear,} = this.props;
    return (
      <>
        <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
          <ActionHeader
            leftComponent={
              <EmployeesActionLeft
                viewType={viewType}
                setEmployeeViewType={setEmployeeViewType}
                currentData={currentData}
                handleClear={handleClear}
                handleChange={handleChange}
                handleLocationChange={this.props.handleLocationChange}
                handleDepartmentChange={this.props.handleDepartmentChange}
                selectedDepartment={this.props.selectedDepartment}
                selectedLocation={this.props.selectedLocation}
                handleDropdownChange={this.props.handleDropdownChange}
                handleFilterChange={this.props.handleFilterChange}
                filter={this.props.filter}
                setCurrentData={this.props.setCurrentData}
              />
            }
            rightComponent={
              <EmployeesActionRight handleEmployeeModal={handleEmployeeModal} />
            }
          />
        </div>

        <div></div>
      </>
    );
  }
}

export default EmployeesHeader;
