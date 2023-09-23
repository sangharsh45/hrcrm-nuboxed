import React, { Component, lazy, useEffect } from "react";
import { Icon } from "antd";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import MileageForm from "./MileageForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getMileageDetails } from "../../../Settings/SettingsAction";

const TabPane = StyledTabs.TabPane;

function MileageTab(props) {
  // useEffect(() => {
  //   props.getMileageDetails(props.orgId);
  // }, []);
  return (
    <>
      <TabsWrapper>
        {/* <StyledTabs defaultActiveKey="1" type="card"> */}
        {/* <TabPane tab={`Distribution`} key="1"> */}
        <MileageForm  />
        {/* </TabPane> */}
        {/* <TabPane tab={`Aging`} key="2">
            <LeadsForm leadsData={props.leadsData} />
          </TabPane> */}
        {/* </StyledTabs> */}
      </TabsWrapper>
    </>
  );
}

const mapStateToProps = ({ settings,auth }) => ({ 
  mileageData: settings.mileageData,
  orgId: auth.userDetails.organizationId,
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
      getMileageDetails 
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MileageTab);
