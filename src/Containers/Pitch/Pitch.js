import React, { Suspense, lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PitchHeader from "./Child/PitchHeader"
import PitchCardList from "./Child/PitchCardList"
import AddPitchModal from "../Pitch/Child/AddPitchModal"
import {handlePitchModal } from "../Pitch/PitchAction";
import { BundleLoader, GridLoader } from "../../Components/Placeholder";


function Pitch (props) {


        return (
            <React.Fragment>
            <PitchHeader
            // handleDropChange={this.handleDropChange}
            // currentUser={this.state.currentUser}
              
                 handlePitchModal={props.handlePitchModal}
            // setLeadsViewType={setLeadsViewType}
            //   viewType={viewType}
            //   handleChange={this.handleChange}
            //   handleClear={this.handleClear}
            //   currentData={this.state.currentData}
            //   setCurrentData={this.setCurrentData}
            />
             <AddPitchModal
             
              addPitchModal={props.addPitchModal}
             
              handlePitchModal={props.handlePitchModal}
            />
           
          
            <Suspense fallback={<BundleLoader />}>
              {/* {viewType==="card" ? (
     <LeadsCardList/>
              ):viewType==="list" ? (<LeadsJunkList/>)
            :null} */}
            <PitchCardList/>
           
            </Suspense>
     
          </React.Fragment>
        )
}

const mapStateToProps = ({ pitch }) => ({
    addPitchModal:pitch.addPitchModal
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handlePitchModal
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Pitch);