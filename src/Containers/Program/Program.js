import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {handleProgramModal,
  setProgramViewType} from "../Program/ProgramAction"
import ProgramHeader from "./Child/ProgramHeader";
const AddProgramModal =lazy(()=>import("./Child/ProgramModal/AddProgramModal"));
const ProgramTable =lazy(()=>import("./Child/ProgramTable/ProgramTable"));
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
        <Suspense fallback={"Loading"}> 
        <AddProgramModal
        addProgramModal={addProgramModal}
        handleProgramModal={handleProgramModal}
        />

        <ProgramTable/>

        </Suspense>
       
   
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
