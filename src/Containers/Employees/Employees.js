import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EmployeesHeader from "./Child/EmployeesHeader";
import AddEmploymentModal from "./Child/AddEmployeeModal";
import { setEmployeeViewType, handleEmployeeModal, getEmployeelist,getEmployeeFilterlist } from "./EmployeeAction";
import EmployeeCardView from "./Child/EmployeeCard/EmployeeCardView";
import EmployeeCardList from "./Child/EmployeeCard/EmployeeCardList";
const EmployeeTable = lazy(() => import("./Child/EmployeeTable/EmployeeTable"));
const EmployeeGroup = lazy(() => import("./Child/EmployeeGroup/EmployeeGroup"));

class Employees extends Component {

  state = { currentData: "", filter:"cretiondate", };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getEmployeelist();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  handleChange = (e) => {
    this.setState({ currentData: e.target.value })
   
  };
  handleFilterChange=(data)=>{
    this.setState({filter:data})
    this.props.getEmployeeFilterlist(data)
  }
  handleClear = () => {
    this.setState({ currentData: "" });
    // this.props.emptyCustomer();
    this.props.getEmployeelist();
  };
  render() {
    const {
      setEmployeeViewType,
      addEmployeeModal,
      handleEmployeeModal,
      viewType,
    } = this.props;
    return (
      <React.Fragment>
        <EmployeesHeader
          handleEmployeeModal={handleEmployeeModal}
          setEmployeeViewType={setEmployeeViewType}
          viewType={viewType}
          handleFilterChange={this.handleFilterChange}
          filter={this.state.filter}
          handleClear={this.handleClear}
          handleChange={this.handleChange}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
        <AddEmploymentModal
          addEmployeeModal={addEmployeeModal}
          handleEmployeeModal={handleEmployeeModal}
        />
        {/* <EmployeeTable /> */}
        { this.props.viewType==="tile"?
        <EmployeeCardView
        filter={this.state.filter}
           viewType={viewType}
        />:
        this.props.viewType === "table" ?
        <EmployeeTable 
        viewType={viewType}
        />:
        this.props.viewType === "card" ?
        <EmployeeCardList 
        filter={this.state.filter}
        viewType={viewType}
        />:
        null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ employee }) => ({
  addEmployeeModal: employee.addEmployeeModal,
  viewType: employee.viewType,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setEmployeeViewType,
      handleEmployeeModal,
      getEmployeelist,
      getEmployeeFilterlist
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Employees);
