import React, {useState, Suspense, lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader, GridLoader } from "../../Components/Placeholder";
import {setDealViewType}from "./DealAction";

const DealHeader = lazy(()=>import("./Child/DealHeader"));
const DealCardList = lazy(()=>import("./Child/DealTable/DealCardList"));

function Deal (props) {
 
    const [currentData,SetcurrentData]=useState("");

   const {
      addOpportunityModal,
      handleOpportunityModal,
      viewType,
      setDealViewType
    } = props;
        return (
     
            <React.Fragment>
                       <DealHeader 
                       viewType={viewType}
                       setDealViewType={setDealViewType}
                       />
                       <Suspense fallback={<BundleLoader />}>
          {viewType === "table" ?

          <DealCardList/>
        //   :
        //   viewType === "dashboard" ?
       
        //     <OpportunityDeletedCard/>
        //      :
        //      viewType === "close" ?
                  
        //             <OpportunityCloseCard/>
        //              :
        //      viewType === "lost" ?

        //            <OpportunityLostCard/>
        //             :
        //             viewType === "Map" ?
        //             <OpportunityMap/> :
        //      viewType === "card" ?
        //      <OpportunityCardView/> :
        //      viewType === "stage" ?
        //      <OpportunityBoard/>
             :

            null}
                 </Suspense>
            </React.Fragment>
        )
}

const mapStateToProps = ({ auth,deal}) => ({
viewType:deal.viewType,
userId: auth.userDetails.userId,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setDealViewType
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Deal);