import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { getCurrencyList ,
  allCurrencyMandatory
} from "../Currency/CurrencyAction";
import { Button, } from "antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const SingleCurrency = lazy(() =>
  import("./SingleCurrency")
);



class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedTasks: [],
      isTextInputOpen: false,
      addingUnit: false,
      currency_name: "",
      type: "",
      singleCurrency: "",
      editInd: true,
      currentData: "",
      selected: localStorage.getItem('selected') === 'true',
    };
  
  }
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getCurrencyList();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSelectDeselect = () => {
    const { selected } = this.state;
    this.setState({ selected: !selected }, () => {
      localStorage.setItem('selected', this.state.selected);
       this.props.allCurrencyMandatory(this.state.selected);
    });
  };

  handleSearchChange = (e) => {
    this.setState({ currentData: e.target.value });
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  componentDidMount() {
    const { getCurrencyList,getCountryRecords } = this.props;
    console.log();
    getCurrencyList(getCurrencyList);
   
  }
  render() {
    console.log("selected",this.state.selected)
    const {
        fetchingCurrencyList,
        currencyList,
      translatedMenuItems,
    } = this.props;
    const { currency_name, singleCurrency } =
      this.state;
      if (this.props.fetchingCurrencyList) {
        return <BundleLoader/>;
      }

    // if (fetchingUnitsError) return <p>We are unable to load data</p>;
    return (
      <>
        <div class=" flex flex-nowrap" >
       
          <div class="basis-full overflow-auto text-white"
          >
             {/* <div style={ {width: "18vw",display:"flex"}} >
          <Input
            placeholder={translatedMenuItems[12]}
          
       style={{width:"100%",marginLeft:"0.5rem"}}
            onChange={(e) => this.handleSearchChange(e)}
            value={this.props.currentData}
          />
           
           <Button
          type={this.props.currentData ? "primary" : "danger"}
          onClick={() => {
            this.props.searchCountryName(this.state.currentData);

          }}
        >
            {translatedMenuItems[13]}
       
        </Button>
        &nbsp;
        <Button
          type={this.props.currentData ? "primary" : "danger"}
          onClick={() => {
            this.handleClear();
          }}
        >
            {translatedMenuItems[14]}
      
      
        </Button>
        </div> */}
 
            <div class="flex flex-col">
              <MainWrapper style={{ height: "38em", marginTop: "0.625em" }}>
              <Button 
  type="primary"
  // style={{backgroundColor:this.state.selected ?"red" :"green"}}
  onClick={this.handleSelectDeselect}
  >
          {this.state.selected ? "Clear All" : "Select All"}
        </Button>
        &nbsp;
                 {/* {country.length &&
                  country.map((country, i) => (
                    <SingleCountry
                      key={i}
                      value={singleCountry}
                      name="singleCountry"
                      country={country}
                      handleChange={this.handleChange}
                    />
                  ))}  */}

{
  currencyList.length ? (
  [...currencyList] 
    .sort((a, b) => a.currency_name.localeCompare(b.currency_name)) // Sort by the "name" property
    .map((singleCurrency, i) => (
      <SingleCurrency
        key={i}
        value={singleCurrency.name} 
        name="singleCurrency"
        currency={singleCurrency} 
        handleChange={this.handleChange}
      />
    ))
    ) : (
      <p>No Data Available</p>
    )}










              </MainWrapper>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ currency, auth }) => ({
    fetchingCurrencyList: currency.fetchingCurrencyList,
  currencyList: currency.currencyList,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getCurrencyList,
  
        allCurrencyMandatory,
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Currency);







