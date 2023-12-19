import React, { Suspense, useState } from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import CountryList from "./CountryList";
 import {getCountries} from "../../../../Auth/AuthAction"
import WeekendCountryList from "./WeekendCountryList";

const TabPane = StyledTabs.TabPane;

function SettingsHolidayTab(props) {
    const [departmentData, setDepartmentData] = useState({});
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
    // useEffect(() => {
    //     getCountries();
    //   }, [getCountries]);

    const handleOnClick = (data) => {
        console.log(data);
        setSelectedDepartmentId(data);
        setDepartmentData(data);
      };
     const handleHeaderClick = (data) => {
        console.log(data);
        setSelectedDepartmentId(data);
        setDepartmentData(data);
        props.getCountries();
      };
    
   return (
        <>
            <TabsWrapper>
                <StyledTabs  type="card">
                    <TabPane 
                     tab={
                        <span onClick={() => handleOnClick()}>
                    Holiday List
                        </span>
                    }
                   
                     key="1"
                     >
                    {/* {departmentData && ( */}
                                        <Suspense fallback={"Loading..."}>
                                            <CountryList 
                                    //   country_id={this.departmentData.country_id} 
                                                />
                                            
                                        </Suspense>
                                    {/* )} */}
                     
                    </TabPane>
                    <TabPane 
                       tab={
                        <span >
                   Weekend
                        </span>
                    }
                   
                   key="2"
                    >
                         
                                        <Suspense fallback={"Loading..."}>
                                            <WeekendCountryList 
                                    //   country_id={this.departmentData.country_id} 
                                                />
                                            
                                        </Suspense>
                                 
                     
                    </TabPane>
                  
                </StyledTabs>
                {/* <h1>Approval</h1> */}
            </TabsWrapper>
        </>
    );
}

const mapStateToProps = ({ settings, opportunity, auth }) => ({
    countries: auth.countries,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
         getCountries
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHolidayTab);

