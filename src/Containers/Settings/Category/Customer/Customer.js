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
    getCustomer,
    addCustomer,
    searchCustomerName,
    ClearReducerDataOfCustomer,
  removeCustomer,
  updateCustomer
} from "./CustomerAction";
const SingleCustomer = lazy(() =>
  import("./SingleCustomer")
);


class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedSectors: [],
      isTextInputOpen: false,
      addingCustomer: false,
      name: "",
      type: "",
      singleCustomer: "",
      editInd: true,
      currentData: "",
    };
  }

  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getCustomer(this.props.orgId);
      this.props.ClearReducerDataOfCustomer();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchCustomerName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.  getCustomer(this.props.orgId);
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
    handleAddCustomer = () => {
      const {   addCustomer, customers } = this.props;
      const { name, editInd, addingCustomer, isTextInputOpen } = this.state;
      let customer = { name,
        orgId: this.props.orgId,
        userId:this.props.userId,
         editInd };
    
      let exist =
      customers && customers.some((element) => element.name === name);
    
      // if (exist) {
      //   message.error(
      //     "Can't create as another source type exists with the same name!"
      //   );
      // } else {
           addCustomer(customer,this.props.orgId ,() => console.log("add sector callback"));
        this.setState({
          name: "",
          singleCustomer: "",
          isTextInputOpen: false,
          editInd: true,
        });
      // }
    };
    
  handleDeleteCustomer = (customerTypeId = { customerTypeId }) => {
     this.props.removeCustomer(customerTypeId);
    // this.setState({ name: "", singleCustomer: "" });
  };
  handleupdateCustomer = (name, customerTypeId, editInd, cb) => {
     this.props.updateCustomer(name, customerTypeId, editInd, cb);
    this.setState({ name: "", singleCustomer: "",customerTypeId:"", editInd: true });
  };

  componentDidMount() {
    const {   getCustomer,orgId } = this.props;
    console.log();
       getCustomer(orgId);
    // this.getLinkedSources();
  }
  render() {
    const {
      fetchingCustomer,
      fetchingCustomerError,
      customerListData,
      addingCustomer,
      updatingCustomer,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      name,
      singleCustomer,
      linkedSectors,
    } = this.state;
    if (fetchingCustomer) return <BundleLoader/>;
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
                {customerListData.length ? (
                  customerListData.map((customer, i) => (
                    <SingleCustomer
                      key={i}
                      value={singleCustomer}
                      name1="singleCustomer"
                      customer={customer}
                      linkedSectors={linkedSectors}
                      updatingCustomer={updatingCustomer}
                      handleChange={this.handleChange}
                      handleupdateCustomer={this.handleupdateCustomer}
                      handleDeleteCustomer={this.handleDeleteCustomer}
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
                  placeholder="Add Customer"
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
                  Loading={addingCustomer}
                  onClick={this.handleAddCustomer}
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
                    loading={addingCustomer}
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
        <h4>Updated on {moment(this.props.customerListData && this.props.customerListData.length && this.props.customerListData[0].updationDate).format("ll")} by {this.props.customerListData && this.props.customerListData.length && this.props.customerListData[0].updatedBy}</h4>
      </>
    );
  }
}

const mapStateToProps = ({ catgCustomer,auth }) => ({
  addingCustomer: catgCustomer.addingCustomer,
  addingCustomerError: catgCustomer.addingCustomerError,
  customerListData: catgCustomer.customerListData,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingCustomer: catgCustomer.removingCustomer,
removingCustomerError: catgCustomer.removingCustomerError,
fetchingCustomer: catgCustomer.fetchingCustomer,
fetchingCustomerError: catgCustomer.fetchingCustomerError,

updatingCustomer: catgCustomer.updatingCustomer,
updatingCustomerError: catgCustomer.updatingCustomerError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getCustomer,
        ClearReducerDataOfCustomer,
        searchCustomerName,
        addCustomer,
      removeCustomer,
      updateCustomer,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
