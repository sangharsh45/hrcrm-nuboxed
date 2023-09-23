import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {handleProgramModal,
  setProgramViewType} from "../Program/ProgramAction"
import ProgramHeader from "./Child/ProgramHeader";
import AddProgramModal from "./Child/ProgramModal/AddProgramModal";
import ProgramTable from "./Child/ProgramTable/ProgramTable";



class Program extends Component {

  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  render() {
    const {
        setProgramViewType,
      addProgramModal,
      handleProgramModal,
      viewType,
    } = this.props;
    return (
      <React.Fragment>
        <ProgramHeader
         
         setProgramViewType={setProgramViewType}
          viewType={viewType}
          handleProgramModal={handleProgramModal}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
       <AddProgramModal
        addProgramModal={addProgramModal}
        handleProgramModal={handleProgramModal}
        />
        <ProgramTable/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ program }) => ({
    viewType: program.viewType,
    addProgramModal:program.addProgramModal,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        setProgramViewType,
        handleProgramModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Program);
