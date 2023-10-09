import React, { Suspense, lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader, GridLoader } from "../../Components/Placeholder";
import {setInvestorViewType} from "./InvestorAction";
import CustomerCardView from '../Customer/CustomerCardView';

const InvestorHeader = lazy(() => import("./Child/InvestorHeader"));
const InvestorCardList=lazy(() => import("./Child/InvestorTable/InvestorCardList"));
function Investor (props) {

  const {
    addCustomerModal,
    handleCustomerModal,
    viewType,
    setInvestorViewType,
  } = props;
        return (
            <React.Fragment>
          <InvestorHeader
          viewType={viewType}
          setInvestorViewType={setInvestorViewType}
          />
 <Suspense fallback={<BundleLoader />}>
 { viewType==="card" ?
  <CustomerCardView/> :
  viewType === "list" ?
          <InvestorCardList/> 
          :null}
 </Suspense>
            </React.Fragment>
        )
}

const mapStateToProps = ({ investor,auth }) => ({
  viewType:investor.viewType,
  userId: auth.userDetails.userId,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setInvestorViewType
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Investor);