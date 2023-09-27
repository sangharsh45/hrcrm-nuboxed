import React, { Component, lazy, useEffect } from "react";
import { Icon, Tooltip, Popover } from "antd";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LeadsAgingForm from "./LeadsAgingForm";

const TabPane = StyledTabs.TabPane;

function LeadsConfigTab(props) {
  return (
    <>
      <TabsWrapper>
        <StyledTabs defaultActiveKey="1" type="card">
          <TabPane tab={`Ageing`} key="1">
            <div style={{ marginTop: 10 }}>
              <LeadsAgingForm />
            </div>
          </TabPane>
        </StyledTabs>
      </TabsWrapper>
    </>
  );
}

const mapStateToProps = ({ auth }) => ({
 
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeadsConfigTab);
