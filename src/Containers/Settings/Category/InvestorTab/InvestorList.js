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
  getInvestorList,
  searchInvestorTypeName,
  ClearReducerDataOfInvestorType,
    addInvestorData,
    removeInvestor,
  updateInvestor
} from "../InvestorTab/InvestorListAction";
const SingleInvestorList = lazy(() =>
  import("./SingleInvestorList")
);


class InvestorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedSectors: [],
      isTextInputOpen: false,
      addingInvestorData: false,
      name: "",
      type: "",
      singleInvestor: "",
      editInd: true,
      currentData: "",
    };
  }

  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getInvestorList(this.props.orgId);
      this.props.ClearReducerDataOfInvestorType();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchInvestorTypeName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getInvestorList(this.props.orgId);
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
    handleAddInvestor = () => {
      const {   addInvestorData, investors } = this.props;
      const { name, editInd, addingInvestorData, isTextInputOpen } = this.state;
      let customer = { name,
        orgId: this.props.orgId,
        userId:this.props.userId,
         editInd };
    
      let exist =
      investors && investors.some((element) => element.name === name);
    
      // if (exist) {
      //   message.error(
      //     "Can't create as another source type exists with the same name!"
      //   );
      // } else {
        addInvestorData(customer,this.props.orgId ,() => console.log("add sector callback"));
        this.setState({
          name: "",
          singleInvestor: "",
          isTextInputOpen: false,
          editInd: true,
        });
      // }
    };
    
  handleDeleteInvestor = (investorCategoryId = { investorCategoryId }) => {
     this.props.removeInvestor(investorCategoryId);
    // this.setState({ name: "", singleInvestor: "" });
  };
  handleupdateInvestor = (name, investorCategoryId, editInd, cb) => {
     this.props.updateInvestor(name, investorCategoryId, editInd, cb);
    this.setState({ name: "", singleInvestor: "",investorCategoryId:"", editInd: true });
  };

  componentDidMount() {
    const {   getInvestorList,orgId } = this.props;
    console.log();
    getInvestorList(orgId);
    // this.getLinkedSources();
  }
  render() {
    const {
      fetchingInvestorList,
      fetchingInvestorListError,
      investorListData,
      addingInvestorData,
      updatingInvestor,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      name,
      singleInvestor,
      linkedSectors,
    } = this.state;
    if (fetchingInvestorList) return <BundleLoader/>;
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
                {investorListData.length ? (
                  investorListData.map((investor, i) => (
                    <SingleInvestorList
                      key={i}
                      value={singleInvestor}
                      name1="singleInvestor"
                      investor={investor}
                      linkedSectors={linkedSectors}
                      updatingInvestor={updatingInvestor}
                      handleChange={this.handleChange}
                      handleupdateInvestor={this.handleupdateInvestor}
                      handleDeleteInvestor={this.handleDeleteInvestor}
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
                  placeholder="Add Investor"
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
                  Loading={addingInvestorData}
                  onClick={this.handleAddInvestor}
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
                    loading={addingInvestorData}
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
        <h4>Updated on {moment(this.props.investorListData && this.props.investorListData.length && this.props.investorListData[0].updationDate).format("ll")} by {this.props.investorListData && this.props.investorListData.length && this.props.investorListData[0].updatedBy}</h4>
      </>
    );
  }
}

const mapStateToProps = ({ investorList,auth }) => ({
  addingInvestorData: investorList.addingInvestorData,
  addingInvestorDataError: investorList.addingInvestorDataError,
  investorListData: investorList.investorListData,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingInvestor: investorList.removingInvestor,
removingInvestorError: investorList.removingInvestorError,
fetchingInvestorList: investorList.fetchingInvestorList,
fetchingInvestorListError: investorList.fetchingInvestorListError,

updatingInvestor: investorList.updatingInvestor,
updatingInvestorError: investorList.updatingInvestorError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvestorList,
      searchInvestorTypeName,
      ClearReducerDataOfInvestorType,
        addInvestorData,
        removeInvestor,
      updateInvestor,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(InvestorList);
