import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import PartnerHeader from "./child/PartnerHeader";
import { handlePartnerModal,emptyPartner, getPartnerListByUserId,getPartnerPagination,setPartnerViewType } from "./PartnerAction";
import PartnerCardView from "./PartnerCardView";
import PartnerMap from "../Partner/PartnerMap"
const AddPartnerModal=lazy(()=>import("./child/AddPartnerModal"));
const PartnerTable=lazy(()=>import("./child/PartnerTable/PartnerTable"));


class Partner extends Component {
  state = { currentData: undefined,text:undefined ,currentUser:""};
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.emptyPartner()
    this.props.getPartnerListByUserId(this.state.currentUser?this.state.currentUser:this.props.userId,0);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  handleChange = (e) => {
    this.setState({ currentData: e.target.value })
   
  };

  handleDropChange=(value)=>{
    this.setState({ currentUser: value });
      this.props.getPartnerPagination(value,0 );
    console.log("valid",value)
  };
  

  render() {
    const { handlePartnerModal, addPartnerModal,viewType,setPartnerViewType } = this.props;
    return (
      <React.Fragment>
        <PartnerHeader
           handleDropChange={this.handleDropChange}
           currentUser={this.state.currentUser}
          viewType={viewType}
          setPartnerViewType={setPartnerViewType}
          handlePartnerModal={handlePartnerModal}
          handleClear={this.handleClear}
          text={this.state.text}
          handleChange={this.handleChange}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
          
          
        />
        <AddPartnerModal
          addPartnerModal={addPartnerModal}
          handlePartnerModal={handlePartnerModal}
        />
        <Suspense fallback={<BundleLoader />}>
        {this.props.viewType === "list" ?
         <PartnerTable 
         currentUser={this.state.currentUser} 
         /> :
            null}
             {this.props.viewType === "card" ?
         <PartnerCardView /> :
            null}
             {this.props.viewType==="map"?
          <PartnerMap/>:
            
            null}
        </Suspense>
      
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ partner, auth }) => ({
  userId: auth.userDetails.userId,
  addPartnerModal: partner.addPartnerModal,
  viewType: partner.viewType,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handlePartnerModal,
      getPartnerListByUserId,
      setPartnerViewType,
      getPartnerPagination,
      emptyPartner
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Partner);
