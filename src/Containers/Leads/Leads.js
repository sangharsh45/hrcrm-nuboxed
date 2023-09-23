import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddLeadsModal from "./Child/AddLeadsModal";
import LeadsHeader from "./Child/LeadsHeader";
import LeadsTable from "./Child/LeadsTable/LeadsTable";
import {getLeads} from "../Leads/LeadsAction"
 import { setLeadsViewType, handleLeadsModal, getEmployeelist } from "./LeadsAction";


class Leads extends Component {

  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getLeads(this.props.leadsId);
  };
  handleChange = (e) => {
    this.setState({ currentData: e.target.value })
   
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  render() {
    const {
      addLeadsModal,
        handleLeadsModal,
        setLeadsViewType,
      viewType,
    } = this.props;
    return (
      <React.Fragment>
        <LeadsHeader
            handleLeadsModal={handleLeadsModal}
        setLeadsViewType={setLeadsViewType}
          viewType={viewType}
          handleChange={this.handleChange}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
         <AddLeadsModal
          addLeadsModal={addLeadsModal}
          handleLeadsModal={handleLeadsModal}
        />
       
        <LeadsTable/> 
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ leads }) => ({
    addLeadsModal:leads.addLeadsModal,
   viewType: leads.viewType,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        setLeadsViewType,
         handleLeadsModal,
         getLeads
    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Leads);
