import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { handleLocationModal,setLocationViewType } from "./LocationAction";
import LocationHeader from "./LocationHeader";
import LocationCard from "./LocationCard";
import LocationCard2 from "./LocationCard2";
import AddLocationModal from "./AddLocationModal";

class Location extends Component {
  render() {
    const {setLocationViewType,viewType}=this.props;
    return (
      <React.Fragment>
        <LocationHeader 
        handleLocationModal={this.props.handleLocationModal}
        addlocationModal={this.props.addlocationModal}
        setLocationViewType={setLocationViewType}
        viewType={viewType}/>
        <AddLocationModal
          handleLocationModal={this.props.handleLocationModal}
          addlocationModal={this.props.addlocationModal}
        />
         <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "card" ? (
             <LocationCard
             viewType={viewType}
           />
          ) 
          :this.props.viewType === "tile" ? (
            
            <LocationCard2/>
             )
          : null}
          </Suspense>
       
     
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ location }) => ({
    addlocationModal: location.addlocationModal,
  viewType:location.viewType
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        handleLocationModal,
        setLocationViewType
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Location);


