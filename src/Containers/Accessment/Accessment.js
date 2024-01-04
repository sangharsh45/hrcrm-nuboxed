import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader} from "../../Components/Placeholder";
import AccessmentHeader from "./Child/AccessmentHeader";
 import { setAccessmentViewType, handleAccessmentModal } from "./AccessmentAction";
import AddAccessmentModal from "./Child/AddAccessmentModal";
const AccessmentForm = lazy(() => import("./Child/AccessmentForm"));
const AccessmentTable = lazy(() => import("./Child/AccessmentTable/AccessmentTable"));


class Accessment extends Component {
  state = { currentData: undefined,responseData:null,text:undefined,currentSkillData: "" };
  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  handleChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value })
   
  };
  render() {
    const {
        addAccessmentModal,
        handleAccessmentModal,
        setAccessmentViewType,
      viewType,
    } = this.props;
    return (
      <React.Fragment>
        <AccessmentHeader
           handleAccessmentModal={handleAccessmentModal}
        setAccessmentViewType={setAccessmentViewType}
          viewType={viewType}
          handleClear={this.handleClear}
          handleChange={this.handleChange}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
         <AddAccessmentModal
          addAccessmentModal={addAccessmentModal}
          handleAccessmentModal={handleAccessmentModal}
        />
        <Suspense fallback={<BundleLoader/>}>
        <AccessmentForm />
        <AccessmentTable />
        </Suspense>
     
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ assessment }) => ({
    addAccessmentModal:assessment.addAccessmentModal,
   viewType: assessment.viewType,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        setAccessmentViewType,
        handleAccessmentModal
    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Accessment);
