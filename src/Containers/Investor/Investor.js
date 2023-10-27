import React, {useState,Suspense,lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader, GridLoader } from "../../Components/Placeholder";
import {setInvestorViewType,handleInvestorModal} from "./InvestorAction";
import {getInvestorsbyId,emptyInvestor} from "./InvestorAction";
import {
  getLatestCustomer,
  getCustomerCloser, 
} from "../Customer/CustomerAction";
import moment from "moment";
import CustomerCardView from '../Customer/CustomerCardView';
const InvestorHeader = lazy(() => import("./Child/InvestorHeader"));
const InvestorCardList=lazy(() => import("./Child/InvestorTable/InvestorCardList"));
const AddInvestorModal=lazy(()=>import("./Child/AddInvestorModal"));
const InvestorCardView=lazy(()=>import("./Child/InvestorTable/InvestorCardView"));

function Investor (props) {
const [currentData,setcurrentData]=useState("");
const [currentUser,setcurrentUser]=useState("");
const [filter, setFilter] = useState("creationdate");

function handleClear () {
  const startDate = moment()
    .startOf("month")
    .toISOString();
  const endDate = moment()
    .endOf("month")
    .toISOString();
    setcurrentData(currentData);
props.emptyInvestor();
  this.props.getInvestorsbyId(this.state.currentUser?this.state.currentUser:this.props.userId,0);
  this.props.getLatestCustomer(this.props.userId);
  this.props.getCustomerCloser(this.props.userId, startDate, endDate);
};
function handleCurrentData (value){
  setcurrentData(value)
}
const handleFilterChange = (data) => {
  setFilter(data);
  props.getInvestorsbyId(props.userId, 0, data);
};
const handleChange = (e) => {
  setcurrentData(e.target.value)
};

  const {
    addInvestorModal,
    handleInvestorModal,
    viewType,
    setInvestorViewType,

  } = props;
        return (
            <React.Fragment>
          <InvestorHeader
          viewType={viewType}
          setInvestorViewType={setInvestorViewType}
          handleInvestorModal={handleInvestorModal}
          currentUser={currentUser}
          currentData={currentData}
          handleClear={handleClear}
          handleChange={handleChange}
          handleCurrentData={handleCurrentData}
          handleFilterChange={handleFilterChange}
          filter={filter}
          />
          <AddInvestorModal
          addInvestorModal={addInvestorModal}
          handleInvestorModal={handleInvestorModal}
          />
 <Suspense fallback={<BundleLoader />}>
 {  viewType === "list" ?
          <InvestorCardList/> 
 
//   :viewType==="card" ?
//  <InvestorCardView/> 
// <CustomerCardView/>  
          :null}
 </Suspense>
            </React.Fragment>
        )
}

const mapStateToProps = ({ investor,auth }) => ({
  viewType:investor.viewType,
  userId: auth.userDetails.userId,
  addInvestorModal:investor.addInvestorModal
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setInvestorViewType,
  handleInvestorModal,
  getLatestCustomer,
  getCustomerCloser,
  getInvestorsbyId,emptyInvestor
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Investor);