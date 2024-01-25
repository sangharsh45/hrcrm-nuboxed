import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Input } from "antd";
import moment from "moment";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper, } from "../../../../Components/UI/Layout";
import { TextInput, } from "../../../../Components/UI/Elements";
import {
    getPayments,
    addPayment,
    searchPaymentName,
    ClearReducerDataOfPayment,
    removePayment,
    updatePayment
} from "../Payment/PaymentAction";
const SinglePayment = lazy(() =>
  import("./SinglePayment")
);

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedSectors: [],
      isTextInputOpen: false,
      addingPayment: false,
      name: "",
      type: "",
      singlePayment: "",
      editInd: true,
      currentData: "",
    };
  }

  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getPayments(this.props.orgId);
      this.props.ClearReducerDataOfPayment();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchPaymentName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getPayments(this.props.orgId);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value });
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
    handleAddPayment = () => {
      const {   addPayment, payments } = this.props;
      const { name, editInd, addingPayment, isTextInputOpen } = this.state;
      let customer = { name,
        orgId: this.props.orgId,
        userId:this.props.userId,
         editInd };
    
      let exist =
      payments && payments.some((element) => element.name === name);
    
      // if (exist) {
      //   message.error(
      //     "Can't create as another source type exists with the same name!"
      //   );
      // } else {
        addPayment(customer,this.props.orgId ,() => console.log("add sector callback"));
        this.setState({
          name: "",
          singlePayment: "",
          isTextInputOpen: false,
          editInd: true,
        });
      // }
    };
    
  handleDeletePayment = (paymentCatagoryId = { paymentCatagoryId }) => {
     this.props.removePayment(paymentCatagoryId);
    // this.setState({ name: "", singlePayment: "" });
  };
  handleupdatePayment = (name, paymentCatagoryId, editInd, cb) => {
     this.props.updatePayment(name, paymentCatagoryId, editInd, cb);
    this.setState({ name: "", singlePayment: "",paymentCatagoryId:"", editInd: true });
  };

  componentDidMount() {
    const {   getPayments,orgId } = this.props;
    console.log();
    getPayments(orgId);
    // this.getLinkedSources();
  }
  render() {
    const {
        fetchingPayment,
        fetchingPaymentError,
      paymentsListData,
      addingPayment,
      updatingPayment,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      name,
      singlePayment,
      linkedSectors,
    } = this.state;
    if (fetchingPayment) return <BundleLoader/>;
    //if (fetchingSectorsError) return <p>We are unable to load data</p>;
    return (
      <>
      <div class="flex flex-nowrap" >
          <MainWrapper
            style={{
              flexBasis: "100%",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
            <div class=" flex w-[18vw]" >
            <Input
         placeholder="Search by Name"
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
            onPressEnter={this.handleSearch}  
            onChange={this.handleChangeDes}
            // value={currentData}
          />
            </div>

            <div class=" flex flex-col" >
              {/* <Title style={{ padding: 8 }}>Types Of Documents</Title> */}
             <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
             {paymentsListData.length ? (
  paymentsListData
    .slice() 
    .sort((a, b) => a.name.localeCompare(b.name)) 
    .map((payment, i) => (
                    <SinglePayment
                      key={i}
                      value={singlePayment}
                      name1="singlePayment"
                      payment={payment}
                      updatingPayment={updatingPayment}
                      handleChange={this.handleChange}
                      handleupdatePayment={this.handleupdatePayment}
                      handleDeletePayment={this.handleDeletePayment}
                      handleClear={this.handleClear}
                      handleSearchChange={this.handleSearchChange}
                      currentData={this.state.currentData}
                      setCurrentData={this.setCurrentData}
                    />
                  ))
                  ) : (
                    <p>No Data Available</p>
                  )}
              </MainWrapper>
            </div>
            {isTextInputOpen ? (
              <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]"
            
              >
                <br />
                <br />
                <TextInput
                  placeholder="Add Payment"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!name}
                  Loading={addingPayment}
                  onClick={this.handleAddPayment}
                  style={{ marginRight: "0.125em" }}
                >
                  {/* Save */}
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
                  {/* Cancel */}
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
              </div>
            ) : (
              <>
                <br />
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    loading={addingPayment}
                    onClick={this.toggleInput}
                  >
                    {/* Add More */}
                    <FormattedMessage
                      id="app.addmore"
                      defaultMessage="Add More"
                    />
                  </Button>
                </div>
                {/* <h4>Updated on {moment(this.props.sectors && this.props.sectors.length && this.props.sectors[0].updationDate).format("ll")} by {this.props.sectors && this.props.sectors.length && this.props.sectors[0].name}</h4> */}
              </>
            )}
          </MainWrapper>
      
       
        </div>
        <h4>Updated on {moment(this.props.paymentsListData && this.props.paymentsListData.length && this.props.paymentsListData[0].updationDate).format("ll")} by {this.props.paymentsListData && this.props.paymentsListData.length && this.props.paymentsListData[0].updatedBy}</h4>
      </>
    );
  }
}

const mapStateToProps = ({ payments,auth }) => ({
    addingPayment: payments.addingPayment,
    addingPaymentError: payments.addingPaymentError,
    paymentsListData: payments.paymentsListData,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingPayment: payments.removingPayment,
removingPaymentError: payments.removingPaymentError,
fetchingPayment: payments.fetchingPayment,
fetchingPaymentError: payments.fetchingPaymentError,

updatingPayment: payments.updatingPayment,
updatingPaymentError: payments.updatingPaymentError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getPayments,
        ClearReducerDataOfPayment,
        searchPaymentName,
        addPayment,
        removePayment,
        updatePayment,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
