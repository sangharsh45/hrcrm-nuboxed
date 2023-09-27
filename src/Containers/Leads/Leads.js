import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddLeadsModal from "./Child/AddLeadsModal";
import LeadsHeader from "./Child/LeadsHeader";
import { BundleLoader } from "../../Components/Placeholder";
import LeadsTable from "./Child/LeadsTable/LeadsTable";
import {getLeads} from "../Leads/LeadsAction"
import { setLeadsViewType, handleLeadsModal, getEmployeelist } from "./LeadsAction";
const LeadsCardList = lazy(()=>import("./Child/LeadsTable/LeadsCardList"));

class Leads extends Component {

  state = { currentData: "",currentUser:"" };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getLeads(this.props.userId);
  };
  handleChange = (e) => {
    this.setState({ currentData: e.target.value })
   
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  handleDropChange=(value)=>{
    this.setState({ currentUser: value });
      this.props.getLeads(value );

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
        handleDropChange={this.handleDropChange}
        currentUser={this.state.currentUser}
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
       
        {/* <LeadsTable/>  */}
        <Suspense fallback={<BundleLoader />}>
        <LeadsCardList/>
        </Suspense>
 
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ leads,auth }) => ({
    addLeadsModal:leads.addLeadsModal,
   viewType: leads.viewType,
   userId: auth.userDetails.userId,

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
