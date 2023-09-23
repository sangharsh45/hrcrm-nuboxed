import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
// import EmployeesActionLeft from "./EmployeesActionLeft";
import LeaveActionRight from "./LeaveActionRight";
import LeavesActionLeft from "./LeavesActionLeft";
class LeaveHeader extends Component {
    render() {
        const {
            viewType,
            setLeavesViewType,
            handleChange,
            currentData,
            handleClear,
        } = this.props;
        return (
            <>
                 <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
        <ActionHeader
          leftComponent={
            <LeavesActionLeft
            viewType={viewType}
            handleChange={handleChange}
            setLeavesViewType={setLeavesViewType}
              currentData={currentData}
              handleClear={handleClear}
              setCurrentData={this.props.setCurrentData}
            />
          }
          rightComponent={
            <LeaveActionRight
            viewType={viewType}
            currentUser={this.props.currentUser} 
             />
          }
        />
      </div>
                <div>

                </div>
            </>

        );
    }
}

export default LeaveHeader;
