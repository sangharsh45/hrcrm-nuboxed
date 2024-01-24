import React, { useState,useEffect } from 'react';
import { Tabs, Card } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getMatrixdata} from "../../../SettingsAction"
import {getCountries} from "../../../../Auth/AuthAction"
import MatrixData from './MatrixData';


const { TabPane } = Tabs;

const Matrix = (props) => {
  useEffect(() => {
    props.getCountries();
    props.getMatrixdata(activeTab,props.organizationId);
    console.log(activeTab)
  },[activeTab]);

  useEffect(() => {
   
    props.getMatrixdata(activeTab,props.organizationId);
    console.log(activeTab)
  },[activeTab]);
 
  const [activeTab, setActiveTab] = useState(props.countries.length > 0 ? props.countries[0].country_id : null);

  const handleTabClick = (key) => {
    console.log(key)
    setActiveTab(key);
    props.getMatrixdata(key,props.organizationId);
  };

  return (
    <Tabs type="card" activeKey={activeTab} onChange={handleTabClick}>
      {props.countries.map((item) => (
        <TabPane key={item.country_id
        } tab={item.country_name}>
          {/* <Card>
            <p>Country: {item.country_name}</p>
            <p>ID: {item.country_id}</p>
          </Card> */}
          <MatrixData
          activeTab={activeTab}
          />
        </TabPane>
      ))}
    </Tabs>
  );
};

const mapStateToProps = ({ settings, opportunity, auth }) => ({
    countries: auth.countries,
    organizationId: auth.userDetails.organizationId,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getCountries,
        getMatrixdata
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Matrix);