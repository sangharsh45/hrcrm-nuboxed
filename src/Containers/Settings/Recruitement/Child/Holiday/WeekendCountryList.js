




import React, { Component, lazy, PureComponent, Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import {getCountries} from "../../../../Auth/AuthAction"
import Weekend from "../Weekend/Weekend";

const TabPane = StyledTabs.TabPane;
class WeekendCountryList extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            key: "",
            departmentData: {}
        }
    }

    componentDidMount() {
        this.props.getCountries()
    }

    handleOnClick = (data) => {
        console.log(data);
        debugger;
        this.setState({
            departmentData: data,
        });

    };
    render() {
        const { countries } = this.props;
        console.log(this.state.departmentData.country_id)
        console.log(this.state.departmentData.country_name)
        return (
            <>
                <TabsWrapper>
                    <StyledTabs type="card">
                        {countries.map((member, i) => {
                            return (
                                <TabPane
                                    key={i}
                                    tab={
                                        <span onClick={() => this.handleOnClick(member)}>
                                            {member.country_name}
                                        </span>
                                    }
                                >
                                    {this.state.departmentData.country_id && (
                                        <Suspense fallback={"Loading..."}>
                                          
                           <div style={{ marginTop: 10 }}>
                            <Weekend country_name={this.state.departmentData.country_name}
                            country_id={this.state.departmentData.country_id}
                            
                            />
                        </div>
                                        </Suspense>
                                    )}

                                </TabPane>
                            );
                        })} 

                    </StyledTabs>
                </TabsWrapper>
            </>
        )
    }
}

const mapStateToProps = ({ settings, opportunity, auth }) => ({
    countries: auth.countries,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getCountries
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WeekendCountryList);

// import React, { Component, PureComponent, Suspense } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTabs } from "../../../../../Components/UI/Antd";
// import { TabsWrapper } from "../../../../../Components/UI/Layout";
// import { getCountries } from "../../../../Auth/AuthAction";
// import Weekend from "../Weekend/Weekend";

// const TabPane = StyledTabs.TabPane;

// class WeekendCountryList extends PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       selectedCountry: null,
//     };
//   }

//   componentDidMount() {
//     this.props.getCountries();
//   }

//   handleOnClick = (selectedCountry) => {
//     this.setState({ selectedCountry });
//   };

//   render() {
//     const { countries } = this.props;
//     const { selectedCountry } = this.state;

//     return (
//       <>
//         <TabsWrapper>
//           <StyledTabs type="card">
//             {countries.map((country, i) => (
//               <TabPane
//                 key={i}
//                 tab={
//                   <span onClick={() => this.handleOnClick(country)}>
//                     {country.country_name}
//                   </span>
//                 }
//               >
//                 {selectedCountry && (
//                   <Suspense fallback={"Loading..."}>
//                     <div style={{ marginTop: 10 }}>
//                       <Weekend
//                         country_name={selectedCountry.country_name}
//                         country_id={selectedCountry.country_id}
//                       />
//                     </div>
//                   </Suspense>
//                 )}
//               </TabPane>
//             ))}
//           </StyledTabs>
//         </TabsWrapper>
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ auth }) => ({
//   countries: auth.countries,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getCountries,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(WeekendCountryList);














