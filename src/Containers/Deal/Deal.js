import React, {useState, Suspense, lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader, GridLoader } from "../../Components/Placeholder";
import {setDealViewType,handleDealModal}from "./DealAction";
import DealsBoard from "./Child/DealsBoard"
const DealHeader = lazy(()=>import("./Child/DealHeader"));
const DealCardList = lazy(()=>import("./Child/DealTable/DealCardList"));
const CreateDealModal = lazy(() => import("./Child/CreateDealModal"));

function Deal (props) {
 
    const [currentData,SetcurrentData]=useState("");

   const {
    opencreateDealModal,
      handleDealModal,
      viewType,
      setDealViewType
    } = props;
        return (
     
            <React.Fragment>
                       <DealHeader 
                       viewType={viewType}
                       setDealViewType={setDealViewType}
                       opencreateDealModal={opencreateDealModal}
                       handleDealModal={handleDealModal}
                       />
                       <CreateDealModal 
                       opencreateDealModal={opencreateDealModal}
                       handleDealModal={handleDealModal}/>

                       <Suspense fallback={<BundleLoader />}>
          {viewType === "table" ?

          <DealCardList/>
           :
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
             viewType === "stage" ?
             <DealsBoard/>
             :

            null}
                 </Suspense>
            </React.Fragment>
        )
}

const mapStateToProps = ({ auth,deal}) => ({
viewType:deal.viewType,
userId: auth.userDetails.userId,
opencreateDealModal:deal.opencreateDealModal
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setDealViewType,
    handleDealModal
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Deal);