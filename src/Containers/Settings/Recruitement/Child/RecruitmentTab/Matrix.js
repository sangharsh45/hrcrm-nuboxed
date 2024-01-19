import React, { useState,useEffect } from 'react';
import { Tabs, Card } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getCountries} from "../../../../Auth/AuthAction"
import MatrixData from './MatrixData';


const { TabPane } = Tabs;

const Matrix = (props) => {
  useEffect(() => {
    props.getCountries();
  },[]);
 
  const [activeTab, setActiveTab] = useState(props.countries.length > 0 ? props.countries[0].country_id : null);

  const handleTabClick = (key) => {
    setActiveTab(key);
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
          <MatrixData/>
        </TabPane>
      ))}
    </Tabs>
  );
};

const mapStateToProps = ({ settings, opportunity, auth }) => ({
    countries: auth.countries,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getCountries
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Matrix);